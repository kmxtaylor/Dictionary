import { useContext } from 'react';
import { ThemeContext } from 'contexts/Theme';

export const useTheme = () => {
  const { theme, setTheme, loading, colors } = useContext(ThemeContext);
  return { theme, setTheme, loading, colors };
};