import { View, Text, StyleSheet } from 'react-native';

const FontSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Font Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'hsl(0, 0%, 100%)',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default FontSettings;
