import { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Tabs from 'navigation/Tabs';
import { useTheme } from 'hooks/useTheme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootNavigation = () => {
  const { theme, colors } = useTheme();

  const [fontsLoaded] = useFonts({
    'Inconsolata-Regular': require('/../assets/fonts/inconsolata/static/Inconsolata-Regular.ttf'),
    'Inconsolata-Bold': require('/../assets/fonts/inconsolata/static/Inconsolata-Bold.ttf'),
    'Inter-Regular': require('/../assets/fonts/inter/static/Inter-Regular.ttf'),
    'Inter-Bold': require('/../assets/fonts/inter/static/Inter-Bold.ttf'),
    'Lora-Regular': require('/../assets/fonts/lora/static/Lora-Regular.ttf'),
    'Lora-Bold': require('/../assets/fonts/lora/static/Lora-Bold.ttf'),
    'Lora-BoldItalic': require('/../assets/fonts/lora/static/Lora-BoldItalic.ttf'),
  });

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...colors,
      border: 'transparent',
    },
  };

  // wait for the theme and fonts to load before hiding the splash screen
  useEffect(() => {
    const fetchSetting = async () => {
      if (!theme.loading && fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    fetchSetting();
  }, [theme.loading, fontsLoaded]);

  if (theme.loading) return null;
  if (!fontsLoaded) return null;

  return (
    <NavigationContainer
      theme={navigationTheme}
    >
      <Tabs />
    </NavigationContainer>
  );
};

export default RootNavigation;
