// import { View, TextBold, StyleSheet } from 'react-native';
import { StyleSheet } from 'react-native';

import { View, Text, TextBold } from 'components/themed';
import Layout from 'layouts/Main';

const FontSettings = () => {
  return (
    <Layout>
      <View style={{ padding: 20 }}>
        <Text style={styles.text}>Font Settings</Text>
        <TextBold style={styles.text}>bold test</TextBold>
        <TextBold style={[styles.text, styles.italic]}>bold italic test</TextBold>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  italic: {
    fontStyle: 'italic',
  },
});

export default FontSettings;
