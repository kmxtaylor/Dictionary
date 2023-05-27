import { useContext } from 'react';
import { FontContext, Fonts } from 'contexts/Font';

export const useFont = () => {
  const { font, setFont, loading, colors } = useContext(FontContext);
  return { font, setFont, loading, colors, Fonts };
};