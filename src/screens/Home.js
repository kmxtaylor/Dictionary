import { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { A } from '@expo/html-elements';

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
  const [definition, setDefinition] = useState('');
  const [prounciation, setProunciation] = useState('');

  const { colors } = useTheme();
  const { font } = useFont();

  // console.log('colors:', colors);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
     /*
      const data = response.data[0].meanings[0].definitions[0].definition;
      //const styledWord = `<Text style={styles.searchedWord}>${word}</Text>`;
      //const styledDefinition = data.replace(word, styledWord);
      setDefinition(data);
      */
     
      // Extracting the array of meanings from the response data.
      const meanings = response.data[0].meanings;

      // Mapping through the meanings array and extracting the definitions.
      const formattedDefinitions = meanings.map(meaningObject => {
        // Extracting the definitions array from each meaning.
        const definitions = meaningObject.definitions; 
        
        // Mapping through the definitions array and formatting each definition.
        const formattedDefinitions = definitions.map((def, index) => { 
          // Adding the bullet point to each definition.
          return `\u2022 ${def.definition}`; 
        });

        // Joining the definitions with a new line and returning the result as a single string.
        // return formattedDefinitions.join('\n\n'); 

        // Extracting the part of speech from each meaning.
        const partOfSpeech = meaningObject.partOfSpeech;
        // Formatting the part of speech and returning it with the formatted definitions.
        const formattedPartOfSpeech = `${partOfSpeech.charAt(0).toLowerCase() + partOfSpeech.slice(1)}\n\n`;
        // Returning the formatted part of speech and definitions as a single string.
        return formattedPartOfSpeech + formattedDefinitions.join('\n\n');

      });

      // Joining the formatted meaning strings with double newlines and returning as a single string.
      const formattedDefinition = formattedDefinitions.join('\n\n');
      setDefinition(formattedDefinition);
      setSearchedWord(word);
    } catch (error) {
      console.error(error);
      setDefinition('Not Found'); // If the word is not found, give a error message.
      setSearchedWord(' ');
    }
  };

  const playAudio = async () => {
    alert('no audio yet');
  };

  const BulletPoint = ({style, ...props}) => (
    <View
      style={[{ height: 0, width: 1, borderWidth: 3, borderRadius: 5, borderColor: colors.accent }, style]} 
      {...props}
    />
  );

  const HorizontalLine = ({style, ...props}) => (
    <View
      style={[{ height: 0, borderWidth: 1, borderColor: colors.line }, style]} 
      {...props}
    />
  );

  const WordInfo = ({...props}) => {
    // console.log(searchedWord, searchedWord === null);

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
      <View style={styles.wordInfoContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30}}>
          <View>
            <TextBold style={{fontSize: 30}}>{searchedWord ?? 'Example word'}</TextBold>
            { tempWord.phonetic && (
              <Text style={{fontSize: 18, marginTop: 10, color: colors.accent, fontFamily: FontMappings['sans-serif'].regular}}>{tempWord.phonetic}</Text>
            )}
          </View>
          <TouchableOpacity
            onPress={playAudio}
          >
            <IconPlay />
          </TouchableOpacity>
        </View>

        {/* For each part of speech */}
        <View>
          <View style={{flexDirection: 'row', marginTop: 40, alignItems: 'center', justifyContent: 'center'}}>
            <TextBold style={{fontStyle: 'italic', fontSize: 20, color: colors.text}}>{tempWord.meanings[0].partOfSpeech}</TextBold>
            <HorizontalLine style={{flex: 1, marginLeft: 20}} />
          </View>
          <Text style={{marginTop: 40, fontSize: 18, color: colors.subHeading}}>Meaning</Text>
          {/* For each definition */}
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <BulletPoint style={{marginTop: 10}} />
            <Text style={{marginLeft: 10, fontSize: 14, color: colors.text}}>definition</Text>
          </View>
          { tempWord.meanings[0].synonyms && (
            <View style={{flexDirection: 'row', marginTop: 40, alignItems: 'center'}}>
              <Text style={{fontSize: 18, color: colors.subHeading}}>Synonyms</Text>
              {/* <View style={{flex: 1, flexDirection: 'row',}}> */}
                {/* For each synonym */}
                { tempWord.meanings[0].synonyms.map((syn, idx) => (
                  <Text key={idx} style={{marginLeft: 10, fontSize: 14, color: colors.accent}}>{syn}</Text>
                ))}
              {/* </View> */}
            </View>
          )}
        </View>

        <View>
          <HorizontalLine style={{marginTop: 40}} />
          <Text style={{marginTop: 40, textDecorationLine: 'underline', fontSize: 18, color: colors.subHeading}}>Source(s)</Text>
          <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            {/* Not yet a functional link */}
            <A href={tempWord.sourceUrl}>
              <Text style={{textDecorationLine: 'underline', fontSize: 14, color: colors.text}}>{tempWord.sourceUrl}</Text>
              {/* margin wasn't working, so inserted space manually */}
              <View style={{width: 10}} />
              <IconNewWindow style={{marginTop: 5, marginLeft: 10}} />
            </A>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Layout>
      <ScrollView style={{ padding: 20 }} keyboardShouldPersistTaps='handled'>
        {/* When I move this, keyboard doesn't persist;
        if figure that out,
        consider moving searchBar to components/themed/SearchBar.js */}
        <View style={[{backgroundColor: colors.backgroundSecondary}, styles.searchBar]}>
          <TextInput
            style={[
              {color: colors.text, fontFamily: FontMappings[font].bold},
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
    alignItems: 'center', // center horizontally
    justifyContent: 'center', // center vertically
    width: 50,
    height: 50,
  },

  // searchedWord: {
  //   fontSize: 30,
  //   marginVertical: 10,
  //   marginLeft: 30,
  //   //color: 'hsl(0, 0%, 2%)',
  // },
  wordInfoContainer: {
    flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    //marginBottom: 20,
  },
  // definition: {
  //   fontSize: 20,
  //   marginHorizontal: 30,
  //   //marginTop: 20,
  // },
});

export default Home;
