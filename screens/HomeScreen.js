import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

/* SVGs for testing */
import IconArrowDown from '../components/svgs/IconArrowDown';
import IconMoon from '../components/svgs/IconMoon';
import IconNewWindow from '../components/svgs/IconNewWindow';
import IconPlay from '../components/svgs/IconPlay';
import IconSearch from '../components/svgs/IconSearch';
import Logo from '../components/svgs/Logo';

const HomeScreen = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = response.data[0].meanings[0].definitions[0].definition;
      setDefinition(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <IconArrowDown />
      <IconMoon />
      <IconNewWindow />
      <IconPlay />
      <IconSearch />
      <Logo />
      <Text style={styles.title}>Dictionary App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a word"
        value={word}
        onChangeText={text => setWord(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {definition ? (
        <Text style={styles.definition}>{definition}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4285f4',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  definition: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default HomeScreen;
