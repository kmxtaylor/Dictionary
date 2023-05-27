import { useContext } from 'react';
import { ThemeContext, Themes } from 'contexts/Theme';

export const useTheme = () => {
  const { theme, setTheme, loading, colors } = useContext(ThemeContext);
  return { theme, setTheme, loading, colors, Themes };
};