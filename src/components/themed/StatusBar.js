import { StatusBar as DefaultStatusBar } from 'react-native';
import { useTheme } from 'hooks/useTheme';

export const StatusBar = ({ ...rest }) => {
  const { theme, colors } = useTheme();

  const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <DefaultStatusBar
      barStyle={barStyle}
      backgroundColor={colors.background}
      {...rest}
    />
  );
};
