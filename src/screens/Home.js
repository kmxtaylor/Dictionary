import { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import Layout from 'layouts/Main';
import { View, Text } from 'components/themed';
import IconSearch from 'components/svgs/IconSearch';

import { useTheme } from 'hooks/useTheme';
import { useFont } from 'hooks/useFont';
// import FontMappings from 'constants/FontMappings';

const Home = () => {
  const [word, setWord] = useState('');
  const [searchedWord, setSearchedWord] = useState(''); 
  const [definition, setDefinition] = useState('');
  const [prounciation, setProunciation] = useState('');

  const { colors } = useTheme();

  console.log('colors:', colors);

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

  return (
    <Layout>
      <ScrollView style={{ padding: 20 }} keyboardShouldPersistTaps='handled'>
        {/* consider moving searchBar to components/themed/SearchBar.js */}
        <View style={[{backgroundColor: colors.backgroundSecondary}, styles.searchBar]}>
          <TextInput
            style={[
              {color: colors.text, fontFamily: FontMappings[font].regular,},
              styles.searchInput
            ]}
            placeholder="Search for a word..."
            placeholderTextColor={colors.text}
            value={word}
            onChangeText={text => setWord(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <IconSearch color={colors.accent} width={18} height={18} />
          </TouchableOpacity>
        </View>
          {definition ? (
            <View style={styles.definitionContainer}>
              <Text style={styles.searchedWord}>{searchedWord}</Text>
              <Text style={styles.definition}>{definition}</Text>
            </View>
          ) : null}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    borderRadius: 15,
    // backgroundColor: '#757575',
  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: 10,
    marginHorizontal: 10,
    // color: 'hsl(0, 0%, 2%)',
  },
  searchButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', // center horizontally
    justifyContent: 'center', // center vertically
    width: 40,
    height: 40,
  },

  searchedWord: {
    fontSize: 30,
    marginVertical: 10,
    marginLeft: 30,
    //color: 'hsl(0, 0%, 2%)',
  },
  definitionContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    //marginBottom: 20,
  },
  definition: {
    fontSize: 20,
    marginHorizontal: 30,
    //marginTop: 20,
  },
});

export default Home;
