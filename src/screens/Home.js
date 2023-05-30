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

const Home = () => {
  const [word, setWord] = useState('');
  const [searchedWord, setSearchedWord] = useState(null);
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
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = response.data[0];
  
      setSearchedWord(data.word);
      setPhonetic(data.phonetic); // Set the phonetic of the word

      if (data.meanings && data.meanings.length > 0) {
        const wordDefinitions = data.meanings.map(meaning => {
          //console.log(meaning.definitions[0].synonyms); // line to check synonyms
          return {
            partOfSpeech: meaning.partOfSpeech,
            definitions: meaning.definitions.map(definition => {
              //console.log(definition.synonyms); // line to check synonyms
              return definition.definition;
            }),
            examples: meaning.definitions.map(definition => definition.example || ''),
            synonyms: meaning.synonyms || [], // Collect synonyms of all definitions
            antonyms: meaning.antonyms || [] // Collect antonyms of all definitions
          };
        });
        setDefinitions(wordDefinitions);
        setPartOfSpeech(data.meanings[0].partOfSpeech);
        setSynonyms(data.meanings[0].synonyms || []);
        setAntonyms(data.meanings[0].antonyms || []);
        setExamples(data.meanings.map(meaning => meaning.definitions.map(definition => definition.example || '')));
      } else {
        setDefinitions([]);
        setPartOfSpeech('');
        setSynonyms([]);
        setAntonyms([]);
        setExamples([]);
      }
  
      setSourceUrl(data.sourceUrls[0]);
    } catch (error) {
      console.error(error);
    }
  };


  const playAudio = async () => {
    alert('no audio yet');
  };

  const BulletPoint = ({ style, ...props }) => (
    <View
      style={[{ height: 0, width: 1, borderWidth: 3, borderRadius: 5, borderColor: colors.accent }, style]}
      {...props}
    />
  );

  const HorizontalLine = ({ style, ...props }) => (
    <View
      style={[{ height: 0, borderWidth: 1, borderColor: colors.line }, style]}
      {...props}
    />
  );

  const WordInfo = ({ ...props }) => {
    let tempWord = { // temp
      phonetic: '/fəˈnɛtɪk/',
      phonetics: [{
        otherStuff: '',
        audio: 'https://api.dictionaryapi.dev/media/pronunciations/en/keyboard-us.mp3',
      }],
      meanings: [
        {
          partOfSpeech: 'noun',
          definitions: [
            {
              definition: 'loreum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            },
          ],
          synonyms: ['synonym1', 'synonym2', 'synonym3'],
        },
      ],
      sourceUrl: 'https://www.google.com',
    };
    
    return (
      <View style={styles.wordInfoContainer} testID='home-screen'>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
          <View>
            <TextBold style={{ fontSize: 30 }}>{searchedWord ?? 'Example word'}</TextBold>
          </View>
          <TouchableOpacity onPress={playAudio}>
            <IconPlay />
          </TouchableOpacity>
        </View>

        {/* Display the phonetic */}
        {searchedWord && (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 20, color: colors.accent }}>{phonetic}</Text>
        </View>
        )}
  
        {definitions.map((definition, index) => (
          <View key={index}>
            <View style={{ flexDirection: 'row', marginTop: 40, alignItems: 'center', justifyContent: 'center' }}>
              <TextBold style={{ fontStyle: 'italic', fontSize: 20, color: colors.text }}>{definition.partOfSpeech}</TextBold>
              <HorizontalLine style={{ flex: 1, marginLeft: 20 }} />
            </View>
            <Text style={{ marginTop: 40, fontSize: 18, color: colors.subHeading }}>Meaning</Text>
            
            {definition.definitions.map((def, idx) => (
              <View key={idx} style={{ flexDirection: 'row', marginTop: 20 }}>
                <BulletPoint style={{ marginTop: 10 }} />
                <Text style={{ marginLeft: 10, fontSize: 14, color: colors.text }}>{def}</Text>
              </View>
            ))}

            {definition.synonyms.length > 0 && (
              <View style={{ flexDirection: 'column', marginTop: 40, }}>
                <Text style={{ fontSize: 18, color: colors.subHeading }}>Synonyms</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {definition.synonyms.map((syn, idx) => (
                    <Text key={idx} style={{ marginLeft: 10, marginRight: 5, fontSize: 18, color: colors.accent }}>{syn}</Text>
                  ))}
                </View>
              </View>
            )}

            {definition.antonyms.length > 0 && (
              <View style={{ flexDirection: 'column', marginTop: 40, }}>
                <Text style={{ fontSize: 18, color: colors.subHeading }}>Antonyms</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {definition.antonyms.map((ant, idx) => (
                    <Text key={idx} style={{ marginLeft: 10, marginRight: 5, fontSize: 18, color: colors.accent }}>{ant}</Text>
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
                      <View key={idx} style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <BulletPoint style={{ marginTop: 8 }} />
                        <Text
                          style={{ marginLeft: 10, flexWrap: 'wrap', flex: 1, fontSize: 14, color: colors.text }}
                        >
                          "{example}"
                        </Text>
                      </View>
                    );
                  }
                  return null;
                })}
              </View>
            </View>
          )}
          </View>
        ))}
  
        <View>
          <HorizontalLine style={{ marginTop: 40 }} />
          <Text style={{ marginTop: 40, textDecorationLine: 'underline', fontSize: 18, color: colors.subHeading }}>Source(s)</Text>
          <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => Linking.openURL(sourceUrl)}>
              <Text style={{ textDecorationLine: 'underline', fontSize: 14, color: colors.text }}>{sourceUrl}</Text>
              <View style={{ width: 10 }} />
              <IconNewWindow style={{ marginTop: 5, marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  
  return (
    <Layout>
      <ScrollView style={{ padding: 20 }} keyboardShouldPersistTaps='handled'>
        <View style={[{ backgroundColor: colors.backgroundSecondary }, styles.searchBar]}>
          <TextInput
            style={[
              { color: colors.text, fontFamily: FontMappings[font].bold },
              styles.searchInput
            ]}
            placeholder="Search for a word..."
            placeholderTextColor={colors.text}
            value={word}
            onChangeText={text => setWord(text)}
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
  wordInfoContainer: {
    flex: 1,
  },
});

export default Home;
