import { useEffect, useState, useRef } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

import Layout from 'layouts/Main';
import { View, Text, TextBold } from 'components/themed';
import IconSearch from 'components/svgs/IconSearch';
import IconNewWindow from 'components/svgs/IconNewWindow';
import IconPlay from 'components/svgs/IconPlay';

import useIsMountedRef from 'hooks/useIsMountedRef';
import { useTheme } from 'hooks/useTheme';
import { useFont } from 'hooks/useFont';
import FontMappings from 'constants/FontMappings';

import { Audio } from 'expo-av';

const Home = () => {
  // Use state to store the API data, the typed word from the user and the error message.
  const [typedWord, setTypedWord] = useState('');
  const [foundWord, setFoundWord] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [phonetic, setPhonetic] = useState(null);
  const [meanings, setMeanings] = useState(null);
  const [sourceUrls, setSourceUrls] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  
  const { font } = useFont();
  const { colors } = useTheme();

  const [textInputBorder, setTextInputBorder] = useState({borderColor: colors.backgroundSecondary});

  const isMountedRef = useIsMountedRef();

  const resetWordStates = () => { // e.g. when no word found
    setFoundWord(null);
    setAudio(null);
    setAudioURL('');
    setPhonetic('');
    setMeanings(null);
    setSourceUrls(null);
  };

  const handleSearch = async () => {
    try {
      if (typedWord === '') {
        let err = `Search can't be blank.`
        setErrorMsg(err);
        return;
      }

      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${typedWord}`);
      const [ data ] = response.data;

      if (isMountedRef.current) { // avoid bugs w/ state updates to unmounted components
        resetWordStates(); // reset states before setting new states (in case fewer data states are defined for this word than the previous)
        setFoundWord(data.word);
        setPhonetic(data?.phonetic ?? null); // Set the phonetic of the word

        // Check if phonetics exist and contain audio URLs.
        if (data?.phonetics.length > 0) { // don't error out if no phonetics
          const [ audioUrl ] = data.phonetics
            .filter(phonetic => phonetic.audio) // filter out phonetics without audio URLs
            .map(phonetic => phonetic.audio); // extract audio URLs
          setAudioURL(audioUrl ?? '');
        } else {
          setAudioURL('');
        }

        /* explicitly re-set structure here for maintainable data management 
           (much easier to troubleshoot if the API changes)
        */
        const wordData = data.meanings.map((meaning, index) => {
          return {
            key: index, // partially fixes duplicate key warning
            partOfSpeech: meaning?.partOfSpeech ?? '',
            definitions: meaning?.definitions.map((defObj, idx) => {
              return {
                definition: defObj.definition,
                example: defObj.example ?? null,
                synonyms: defObj.synonyms ?? [], // currently unused
                antonyms: defObj.antonyms ?? [], // currently unused
              }
            }),
            synonyms: meaning?.synonyms ?? [],
            antonyms: meaning?.antonyms ?? [],
          };
        });
        setMeanings(wordData);

        setSourceUrls(data?.sourceUrls ?? []);
        setErrorMsg(null);
      }
    } catch (error) {
      // console.log('Error!:', error?.data?.title || error); // doesn't show to user
      // console.log('Error (detailed):', JSON.stringify(error.response, null, 2)); // doesn't show to user
      if (error?.response?.status === 404) {
        let err = `Word not found. Try a different word.`
        setErrorMsg(err);
      }
      else {
        let err = `Can't parse word data. Try again.`
        setErrorMsg(err);
      }
    }
  };

  // const textInputRef = useRef(null);

  // errorMsg changes after onFocus/onBlur triggered, catch changes in errorMsg
  useEffect(() => {
    setTextInputActive(errorMsg);
  }, [errorMsg]);

  const setTextInputActive = (isActive) => {
    const inactiveColor = errorMsg ? colors.error : colors.backgroundSecondary;
    const activeColor = colors.accent;

    const borderColor = isActive ? activeColor : inactiveColor;
    // const borderColor = textInputRef.current?.isFocused ? activeColor : inactiveColor;


    // console.log('isActive:', isActive, 'borderColor:', borderColor);
    // console.log('textInputRef.current?.isFocused: ', textInputRef.current?.isFocused, 'borderColor:', borderColor);
    setTextInputBorder({ borderColor: borderColor, });
  };

  const playAudio = async () => {
    try {
      if (audio) {
        await audio.unloadAsync();
      }
      if (audioURL) {
        const { sound } = await Audio.Sound.createAsync({ uri: audioURL });
        setAudio(sound);
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error playing audio: ', error);
    }
  };
  
  const BulletPoint = ({ style, ...props }) => (
    <View
      style={[{ borderColor: colors.accent }, styles.bulletPoint, style]}
      {...props}
    />
  );

  const HorizontalLine = ({ style, ...props }) => (
    <View
      style={[{borderColor: colors.line}, styles.horizontalLine, style]}
      {...props}
    />
  );

  const WordInfo = ({ ...props }) => {
    if (!foundWord) {
      return null;
    }

    return (
      <View style={styles.wordInfoContainer}>
        <View style={[styles.topRow, {marginTop: 10}]}>
          <View>
            <View>
              <TextBold style={styles.foundWord}>{foundWord}</TextBold>
            </View>
            {phonetic && (
              <Text
                style={{ color: colors.accent, marginTop: 10, fontSize: 20 }}
              >
              {phonetic}
            </Text>
            )}
          </View>
          {audioURL && (
            <TouchableOpacity onPress={playAudio}>
              <IconPlay />
            </TouchableOpacity>
          )}
        </View>

        {/* Word Meanings by Part of Speech */}
        {meanings?.map((meaningSection, index) => (
          <View key={index}>
            <View style={[styles.center, styles.sectionRow]}>
              <TextBold style={[{ color: colors.text }, styles.partOfSpeech]}>
                {meaningSection.partOfSpeech}
              </TextBold>
              <HorizontalLine style={{ marginLeft: 20 }} />
            </View>
            <Text
              style={{ color: colors.subHeading, marginTop: 30, fontSize: 16 }}   testID={`meaningSection-${index}`}
            >
              Meaning
            </Text>

            {meaningSection?.definitions.map((defObj, idx) => (
              <View key={idx} style={styles.meaningRow}>
                <BulletPoint />
                <View style={styles.meaningCol}>
                  <Text style={{ color: colors.text, fontSize: 14 }}>{defObj.definition}</Text>

                  {defObj?.example && (
                    <Text
                      style={[{ color: colors.subHeading, fontSize: 14 }, styles.exampleRow]}
                    >
                      "{defObj.example}"
                    </Text>
                  )}
                </View>
              </View>
            ))}

            {meaningSection?.synonyms.length > 0 && (
              <View style={styles.sectionRow}>
                <Text style={{ color: colors.subHeading, fontSize: 16 }}>
                  Synonyms
                </Text>
                <View style={styles.wrappingList}>
                  {meaningSection.synonyms.map((syn, idx) => (
                    <TextBold
                      key={idx}
                      style={{ color: colors.accent, marginLeft: 10, marginRight: 5, fontSize: 14 }}
                    >
                      {syn}
                    </TextBold>
                  ))}
                </View>
              </View>
            )}

            {meaningSection?.antonyms.length > 0 && (
              <View style={styles.sectionRow}>
                <Text style={{ fontSize: 16, color: colors.subHeading }}>
                  Antonyms
                </Text>
                <View style={styles.wrappingList}>
                  {meaningSection.antonyms.map((ant, idx) => (
                    <TextBold
                      key={idx}
                      style={{ color: colors.accent, marginLeft: 10, marginRight: 5, fontSize: 14 }}
                    >
                      {ant}
                    </TextBold>
                  ))}
                </View>
              </View>
            )}
          </View>
        ))}

        {/* Sources */}
        <View style={{marginBottom: 50}}>
          <HorizontalLine style={{ marginTop: 40 }} />
          <Text
            style={[{ color: colors.subHeading }, styles.sourcesHeader]}
          >
            Source(s)
          </Text>
          {sourceUrls?.map((url, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.sourceLink}
              onPress={() => Linking.openURL(url)}
            >
              <Text style={[{ color: colors.text }, styles.sourceLinkText]}>
                {url}
              </Text>
              <IconNewWindow style={styles.iconNewWindow} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };


  return (
    <Layout>
      <ScrollView style={{ padding: 20 }} keyboardShouldPersistTaps='handled' testID='home-screen'>
        <View
          style={[
            { backgroundColor: colors.backgroundSecondary },
            textInputBorder,
            (errorMsg && { borderColor: colors.error }), // 2nd
            styles.searchBar
          ]}
          testID='search-bar'
        >
          <TextInput
            style={[
              { color: colors.text, fontFamily: FontMappings[font].bold },
              styles.searchInput
            ]}
            placeholder="Enter a word..."
            placeholderTextColor={colors.text}
            value={typedWord}
            onSubmitEditing={handleSearch}
            onChangeText={text => setTypedWord(text)}
            onFocus={() => setTextInputActive(true)}
            onBlur={() => setTextInputActive(false)}
            // ref={textInputRef}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch} testID='search-button'>
            <IconSearch color={colors.accent} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorMsgView}>
          <Text style={{ color: colors.error }}>
            {errorMsg}
          </Text>
        </View>
        <WordInfo />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    height: 50,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: 10,
    marginHorizontal: 15,
    fontSize: 18
  },
  searchButton: {
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  errorMsgView: {
    marginTop: 5,
    marginLeft: 25,
  },

  bulletPoint: {
    height: 0,
    width: 1,
    marginTop: 10,
    marginRight: 10,
    borderWidth: 3,
    borderRadius: 5,
  },
  horizontalLine: {
    flex: 1,
    height: 0,
    borderWidth: 1,
  },

  wordInfoContainer: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30
  },
  foundWord: {
    fontSize: 30 
  },
  phoneticRow: {
    marginTop: 10,
  },
  
  sectionRow: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  partOfSpeech: {
    fontStyle: 'italic',
    fontSize: 20,
  },
  meaningRow: { // includes bullet point
    flexDirection: 'row',
    marginTop: 15,
  },
  meaningCol: { // excludes bullet point
    flex: 1, // important so text doesn't get pushed off screen
  },
  exampleRow: {
    marginTop: 10,
  },
  wrappingList: {
    flex: 1, // important so text doesn't get pushed off screen
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  sourcesHeader: {
    marginTop: 30,
    textDecorationLine: 'underline',
    fontSize: 16.
  },
  sourceLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sourceLinkText: {
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  iconNewWindow: {
    marginTop: 5,
    marginLeft: 10,
  },
});

export default Home;
