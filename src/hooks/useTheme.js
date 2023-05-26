import { useContext } from 'react';
import { ThemeContext } from 'contexts/Theme';

export const useTheme = () => {
  const { theme, setTheme, loading, colors } = useContext(ThemeContext);
  return { theme, setTheme, loading, colors };
  
  // const context = useContext(ThemeContext);

  // return {
  //   theme: context.theme,
  //   colors: context.colors,
  //   setTheme: context.setTheme,
  //   loading: context.loading,
  // };
};