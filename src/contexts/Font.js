import { createContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Fonts = ['sans-serif', 'serif', 'mono'];
// abstracted font category; specific font decided by constants/FontMappings

const FontContext = createContext({
  font: 'serif',
  setFont: () => {},
  loading: true,
});

const FontProvider = ({ children }) => {
  const [font, setFont] = useState('serif');
  const [loading, setLoading] = useState(true);

  // uncomment after confirming everything else works:
  // useEffect(() => {
  //   AsyncStorage.getItem('@user_preferred_font')
  //     .then((storedFont) => {
  //       if (storedFont) {
  //         setFont(storedFont);
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  // useEffect(() => {
  //   AsyncStorage.setItem('@user_preferred_font', font);
  // }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont, loading }}>
      {children}
    </FontContext.Provider>
  );
};

export { FontContext, FontProvider, Fonts };