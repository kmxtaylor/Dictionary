import { Fragment } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { View, Text } from 'components/themed';
import Layout from 'layouts/Main';

import { useFont } from 'hooks/useFont';
import { useTheme } from 'hooks/useTheme';

const Border = () => {
  const { colors } = useTheme();
  return <View style={[styles.border, { backgroundColor: colors.text }]} />;
};

const FontRow = ({ children, checked, onPress }) => {
  const { colors } = useTheme();

  const checkedStyle = [styles.checkbox, { borderColor: colors.text }];

  if (checked) {
    checkedStyle.push({
      borderColor: colors.text,
      backgroundColor: colors.accent,
    });
  }

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={checkedStyle} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const FontSettings = () => {
  const { font, setFont, Fonts } = useFont();

  return (
    <Layout>
      <View style={{ padding: 20 }} testID='font-settings-screen'>
        {/* <Text style={styles.text}>Font Settings</Text>
        <TextBold style={styles.text}>bold test</TextBold>
        <TextBold style={[styles.text, styles.italic]}>bold italic test</TextBold> */}
        {Fonts.map((key, index) => (
          <Fragment key={key}>
            <FontRow onPress={() => setFont(key)} checked={font === key}>
              {key}
            </FontRow>
            {index !== Fonts.length - 1 && <Border />}
          </Fragment>
        ))}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  border: {
    flex: 1,
    height: 1,
    backgroundColor: 'red',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
});

export default FontSettings;

