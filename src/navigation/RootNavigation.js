import { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import BottomTabs from 'navigation/BottomTabs';
import { useTheme } from 'hooks/useTheme';
// import { useThemeColors } from 'hooks/useThemeColors';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootNavigation = () => {
  // const { colors } = useThemeColors();
  const { theme, colors } = useTheme();

  const [fontsLoaded] = useFonts({
    // 'Inconsolata-Regular': require('/../assets/fonts/inconsolata/static/Inconsolata-Regular.ttf'),
    // 'Inconsolata-Bold': require('/../assets/fonts/inconsolata/static/Inconsolata-Bold.ttf'),
    // 'Inconsolata-Bold': require('/../assets/fonts/inconsolata/Inconsolata-VariableFont_wdth,wght.ttf'),
    'Inter-Regular': require('/../assets/fonts/inter/static/Inter-Regular.ttf'),
    'Inter-Bold': require('/../assets/fonts/inter/static/Inter-Bold.ttf'),
    // 'Inter': require('/../assets/fonts/inter/Inter-VariableFont_slnt,wght.ttf'), // Asset not found for android
  });

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors, // this is affecting the header background color, among other things
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
      <BottomTabs />
    </NavigationContainer>
  );
};

export default RootNavigation;
