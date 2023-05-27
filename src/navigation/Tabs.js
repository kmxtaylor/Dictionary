// Import npm packages
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import the different screens
import Home from 'screens/Home';
import FontSettings from 'screens/FontSettings';
import ThemeSettings from 'screens/ThemeSettings';

/* SVGs for testing */
import IconArrowDown from 'components/svgs/IconArrowDown';
import IconMoon from 'components/svgs/IconMoon';
import IconNewWindow from 'components/svgs/IconNewWindow';
import IconPlay from 'components/svgs/IconPlay';
import IconSearch from 'components/svgs/IconSearch';
import Logo from 'components/svgs/Logo';

import { useTheme } from 'hooks/useTheme';
import { useFont } from 'hooks/useFont';
// import FontMappings from 'constants/FontMappings';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create the Home stack
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

// Create the Font Settings stack
const FontSettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FontSettings" component={FontSettings} />
  </Stack.Navigator>
);

// Create the Theme Settings stack
const ThemeSettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ThemeSettings" component={ThemeSettings} />
  </Stack.Navigator>
);

const Tabs = () => {
  const { colors } = useTheme();
  const { font } = useFont();

  return (
    <Tab.Navigator
      initialRouteName='Fonts'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          // console.log(route);
          let icon = null;
          if (route.name === 'Dictionary') {
            icon = <Logo color={color} />;
          } else if (route.name === 'Fonts') {
            icon = <IconArrowDown color={color} />;
          } else if (route.name === 'Themes') {
            icon = <IconMoon color={color} />;
          }
          return icon;
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          display: 'flex',
          backgroundColor: colors.backgroundSecondary,
        },
        headerStyle: {
          backgroundColor: colors.backgroundSecondary,
          // fontFamily: FontMappings[font].regular,
        },
      })}
    >
      <Tab.Screen name="Dictionary" component={HomeStack} />
      <Tab.Screen name="Fonts" component={FontSettingsStack} />
      <Tab.Screen name="Themes" component={ThemeSettingsStack} />
    </Tab.Navigator>
  );
};

export default Tabs;
