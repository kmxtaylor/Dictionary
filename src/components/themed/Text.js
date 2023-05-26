import { Text as DefaultText } from 'react-native';
import { useTheme } from 'hooks/useTheme';

const Text = ({ style, ...rest }) => {
  const {
    colors,
    // fonts
  } = useTheme();

  return (
    <DefaultText
      style={[
        {
          color: colors.text,
          // fontFamily: 'SpaceMono-Regular',
          fontSize: 16
        },
        style,
      ]}
      {...rest}
    />
  );
};

const TextBold = ({ style, ...rest }) => {
  const {
    colors,
    // fonts
  } = useTheme();

  return (
    <DefaultText
      style={[
        { 
          color: colors.text,
          // fontFamily: 'SpaceMono-Bold',
          fontSize: 16
        },
        style,
      ]}
      {...rest}
    />
  );
};

export { Text, TextBold };
export default Text;
