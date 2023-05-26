import { View as DefaultView } from 'react-native';
import { SafeAreaView as DefaultSafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'hooks/useTheme';

export const ViewPlain = ({ ...rest }) => {
  return (<DefaultView {...rest} />);
};

export const View = ({ style, ...rest }) => {
  const { colors } = useTheme();

  return (
    <DefaultView
      style={[{ backgroundColor: colors.background }, style]}
      {...rest}
    />
  );
};

export const ViewContrast = ({ style, ...rest }) => {
  const { colors } = useTheme();

  return (
    <DefaultView
      style={[{ backgroundColor: colors.backgroundSecondary }, style]}
      {...rest}
    />
  );
};

export const SafeAreaView = ({ style, ...rest }) => {
  const { colors } = useTheme();

  return (
    <DefaultSafeAreaView
      style={[{ backgroundColor: colors.background }, style]}
      {...rest}
    />
  );
};
