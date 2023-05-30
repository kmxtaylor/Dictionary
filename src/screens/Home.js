import { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

import Layout from 'layouts/Main';
import { View, Text, TextBold } from 'components/themed';
import IconSearch from 'components/svgs/IconSearch';
import IconNewWindow from 'components/svgs/IconNewWindow';
import IconPlay from 'components/svgs/IconPlay';

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
  const [definitions, setDefinitions] = useState([]);
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const [examples, setExamples] = useState([]);
  const [phonetic, setPhonetic] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');

  const { colors } = useTheme();
  const { font } = useFont();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${typedWord}`);
      const data = response.data[0];

      setFoundWord(data.word);
      setPhonetic(data.phonetic); // Set the phonetic of the word

      // Check if phonetics exist and contain audio URLs.
      if (data.phonetics && data.phonetics.length > 0) {
        const audioUrls = data.phonetics
          .filter(phonetic => phonetic.audio) // Filter out phonetics without audio URLs.
          .map(phonetic => phonetic.audio); // Extract audio URLs.

        if (audioUrls.length > 0) {
          // retrieves the first audio URL.
          setAudioURL(audioUrls[0]);
        } else {
          setAudioURL(''); // No audio URL available.
        }
      } else {
        setAudioURL(''); // No phonetics available for the Audio component.
      }

      // Check if meanings exist and contain definitions.
      if (data.meanings && data.meanings.length > 0) {
        const wordDefinitions = data.meanings.map(meaning => {
          //console.log(meaning.definitions[0].synonyms); // line to check synonyms
          return {
            partOfSpeech: meaning.partOfSpeech,
            definitions: meaning.definitions.map(definition => {
              //console.log(definition.synonyms); // line to check synonyms
              return definition.definition;
            }),
            examples: meaning.definitions.map(definition => definition.example ?? ''),
            synonyms: meaning.synonyms ?? [], // Collect synonyms of all definitions
            antonyms: meaning.antonyms ?? [] // Collect antonyms of all definitions
          };
        });
        setDefinitions(wordDefinitions);
        setPartOfSpeech(data.meanings[0].partOfSpeech);
        setSynonyms(data.meanings[0].synonyms ?? []);
        setAntonyms(data.meanings[0].antonyms ?? []);
        setExamples(data.meanings.map(meaning => meaning.definitions.map(definition => definition.example ?? '')));
        console.log(wordDefinitions);
      } else {
        setDefinitions([]);
        setPartOfSpeech('');
        setSynonyms([]);
        setAntonyms([]);
        setExamples([]);
      }

      setSourceUrl(data.sourceUrls[0]);
    } catch (error) {
      setDefinitions([]);
      setPartOfSpeech('');
      setSynonyms([]);
      setAntonyms([]);
      setExamples([]);
      console.error(error);
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

        {definitions.map((definition, index) => (
          <View key={index}>
            <View style={[styles.center, styles.sectionRow]}>
              <TextBold style={[{ color: colors.text }, styles.partOfSpeech]}>
                {definition.partOfSpeech}
              </TextBold>
              <HorizontalLine style={{ marginLeft: 20 }} />
            </View>
            <Text
              style={{ color: colors.subHeading, marginTop: 30, fontSize: 18 }}
            >
              Meaning
            </Text>

            {definition.definitions.map((def, idx) => (
              <View key={idx} style={styles.defRow}>
                <BulletPoint />
                <Text style={{ color: colors.text, fontSize: 14 }}>{def}</Text>
              </View>
            ))}

            {definition.synonyms.length > 0 && (
              <View style={styles.sectionRow}>
                <Text style={{ color: colors.subHeading, fontSize: 18 }}>
                  Synonyms
                </Text>
                <View style={styles.wrappingList}>
                  {definition.synonyms.map((syn, idx) => (
                    <Text
                      key={idx}
                      style={{ color: colors.accent, marginLeft: 10, marginRight: 5, fontSize: 18 }}
                    >
                      {syn}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {definition.antonyms.length > 0 && (
              <View style={styles.sectionRow}>
                <Text style={{ fontSize: 18, color: colors.subHeading }}>
                  Antonyms
                </Text>
                <View style={styles.wrappingList}>
                  {definition.antonyms.map((ant, idx) => (
                    <Text
                      key={idx}
                      style={{ color: colors.accent, marginLeft: 10, marginRight: 5, fontSize: 18 }}
                    >
                      {ant}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Render the Examples title only if examples are provided */}
            {definition.examples.length > 0 && (
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
            )}
          </View>
        ))}

        <View style={{marginBottom: 50}}>
          <HorizontalLine style={{ marginTop: 40 }} />
          <Text
            style={[{ color: colors.subHeading }, styles.sourcesHeader]}
          >
            Source(s)
          </Text>
          <TouchableOpacity
            style={styles.sourceLink}
            onPress={() => Linking.openURL(sourceUrl)}
          >
            <Text style={[{ color: colors.text }, styles.sourceLinkText]}>
              {sourceUrl}
            </Text>
            <IconNewWindow style={styles.iconNewWindow} />
          </TouchableOpacity>
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
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  partOfSpeech: {
    fontStyle: 'italic',
    fontSize: 20,
  },
  defRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 10,
  },
  wrappingList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  sourcesHeader: {
    marginTop: 30,
    textDecorationLine: 'underline',
    fontSize: 18.
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
