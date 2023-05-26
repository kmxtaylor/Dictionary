// import { View, Text, StyleSheet } from 'react-native';
import { StyleSheet } from 'react-native';

import { View, Text } from 'components/themed';
import Layout from 'layouts/Main';

const FontSettings = () => {
  return (
    <Layout>
      <View style={{ padding: 20 }}>
        <Text style={styles.text}>Font Settings</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
});

export default FontSettings;
