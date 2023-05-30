import { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Linking, LogBox } from 'react-native';
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

import { Audio, Permissions } from 'expo-av';
//import { set } from 'react-native-reanimated';

const Home = () => {
  const [typedWord, setTypedWord] = useState('');
  const [foundWord, setFoundWord] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [phonetic, setPhonetic] = useState(null);
  const [definitions, setDefinitions] = useState(null);
  // const [partOfSpeech, setPartOfSpeech] = useState('');
  // const [synonyms, setSynonyms] = useState([]);
  // const [antonyms, setAntonyms] = useState([]);
  // const [examples, setExamples] = useState([]);
  const [sourceUrls, setSourceUrls] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const { colors } = useTheme();
  const { font } = useFont();

  const isMountedRef = useIsMountedRef();

  const resetWordStates = () => { // e.g. when no word found
    setFoundWord(null);
    setAudio(null);
    setAudioURL('');
    setPhonetic('');
    setDefinitions(null);
    // setPartOfSpeech('');
    // setSynonyms([]);
    // setAntonyms([]);
    // setExamples([]); //
    setSourceUrls(null);

    // don't reset errorMsg here, in case error is not resolved
  };

  const handleSearch = async () => {
    try {
      if (typedWord === '') {
        let err = `Search can't be blank.`
        setErrorMsg(err);
        alert(err); // delete this when you code an official display of the msg
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
            .filter(phonetic => phonetic.audio) // Filter out phonetics without audio URLs
            .map(phonetic => phonetic.audio); // Extract audio URLs

          setAudioURL(audioUrl ?? '');
        } else {
          setAudioURL(''); // No phonetics available for the Audio component
        }


        LogBox.ignoreLogs(['Warning: Encountered two children with the same key, `[object Object]`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.']);

        const wordDefinitions = data.meanings.map((meaning, index) => {
          // console.log(meaning?.definitions);
          return {
            key: index, // partially fixes duplicate key warning
            partOfSpeech: meaning?.partOfSpeech ?? '',
            definitions: meaning?.definitions.map((def, idx) => (
              def.definition ?? null
            )),
            examples: meaning?.definitions.map((def, idx) => (
              def.example ?? null
            )),
            synonyms: meaning?.synonyms ?? [],
            antonyms: meaning?.antonyms ?? [],
          };
        });
        setDefinitions(wordDefinitions);
        // console.log(JSON.stringify(wordDefinitions, null, 2));


        // these don't seem necessary(?) & should be handled by definition:
        // setPartOfSpeech(data.meanings[0].partOfSpeech);
        // setSynonyms(data.meanings[0].synonyms ?? []);
        // setAntonyms(data.meanings[0].antonyms ?? []);
        // setExamples(data.meanings.map(meaning => meaning.definitions.map(definition => definition.example ?? '')));

        setSourceUrls(data?.sourceUrls ?? []);
        setErrorMsg(null);
      }
    } catch (error) {
      // resetWordStates(); // actually, just don't change state until word found
      console.log('Error!:', error?.data?.title || error); // doesn't show to user
      console.log('Error (detailed):', JSON.stringify(error.response, null, 2)); // doesn't show to user
      if (error?.response?.status === 404) {
        let err = `Word not found. Try again.`
        setErrorMsg(err);
        alert(err); // delete this when you code an official display of the msg
      }
      else {
        let err = `Can't parse word data. Try again.`
        setErrorMsg(err);
        alert(err); // delete this when you code an official display of the msg
      }
    }
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
    // let tempWord = { // temp
    //   phonetic: '/fəˈnɛtɪk/',
    //   phonetics: [{
    //     otherStuff: '',
    //     audio: 'https://api.dictionaryapi.dev/media/pronunciations/en/keyboard-us.mp3',
    //   }],
    //   meanings: [
    //     {
    //       partOfSpeech: 'noun',
    //       definitions: [
    //         {
    //           definition: 'loreum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    //         },
    //       ],
    //       synonyms: ['synonym1', 'synonym2', 'synonym3'],
    //     },
    //   ],
    //   sourceUrl: 'https://www.google.com',
    // };

    if (!foundWord) {
      return null;
    }

    return (
      <View style={styles.wordInfoContainer}>
        <View style={styles.topRow}>
          <View>
            <View>
              <TextBold style={styles.foundWord}>{foundWord}</TextBold>
            </View>
            {/* Display the phonetic */}
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

        {definitions?.map((definition, index) => (
          <View key={index}>
            <View style={[styles.center, styles.sectionRow]}>
              <TextBold style={[{ color: colors.text }, styles.partOfSpeech]}>
                {definition.partOfSpeech}
              </TextBold>
              <HorizontalLine style={{ marginLeft: 20 }} />
            </View>
            <Text
              style={{ color: colors.subHeading, marginTop: 30, fontSize: 16 }}
            >
              Meaning
            </Text>

            {definition?.definitions.map((def, idx) => (
              <View key={idx} style={styles.meaningRow}>
                <BulletPoint />
                <View style={styles.meaningCol}>
                  <Text style={{ color: colors.text, fontSize: 14 }}>{def}</Text>

                  {definition?.examples?.map((example, i) => (
                    example && (
                      <Text
                        key={{i}}
                        style={[{ color: colors.subHeading, fontSize: 14 }, styles.exampleRow]}
                      >
                        "{example}"
                      </Text>
                    )
                  ))}
                </View>
              </View>
            ))}

            {definition?.synonyms.length > 0 && (
              <View style={styles.sectionRow}>
                <Text style={{ color: colors.subHeading, fontSize: 16 }}>
                  Synonyms
                </Text>
                <View style={styles.wrappingList}>
                  {definition.synonyms.map((syn, idx) => (
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

            {definition?.antonyms.length > 0 && (
              <View style={styles.sectionRow}>
                <Text style={{ fontSize: 16, color: colors.subHeading }}>
                  Antonyms
                </Text>
                <View style={styles.wrappingList}>
                  {definition.antonyms.map((ant, idx) => (
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

            {/* Render the Examples title only if examples are provided */}
            {/* {definition?.examples.length > 0 && (
              <View style={{ flexDirection: 'column', marginTop: 40 }}>
                <Text style={{ fontSize: 18, color: colors.subHeading }}>Example(s)</Text>
                <View style={{ marginTop: 10 }}>
                  {definition.examples.map((example, idx) => {
                    if (example) {
                      return (
                        <Text
                          style={{ color: colors.subHeading, fontSize: 14 }}
                          key={{idx}}
                        >
                          "{example}"
                        </Text>
                      );
                    }
                    return null;
                  })}
                </View>
              </View>
            )} */}
          </View>
        ))}

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
          style={[{ backgroundColor: colors.backgroundSecondary }, styles.searchBar]}
        >
          <TextInput
            style={[
              { color: colors.text, fontFamily: FontMappings[font].bold },
              styles.searchInput
            ]}
            placeholder="Search for a word..."
            placeholderTextColor={colors.text}
            value={typedWord}
            onChangeText={text => setTypedWord(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <IconSearch color={colors.accent} />
          </TouchableOpacity>
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
