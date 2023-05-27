// Import npm packages
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

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
import FontMappings from 'constants/FontMappings';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// // Create the Home stack
// const HomeStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name='Home' component={Home} />
//   </Stack.Navigator>
// );

// // Create the Font Settings stack
// const FontSettingsStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name='FontSettings' component={FontSettings} />
//   </Stack.Navigator>
// );

// // Create the Theme Settings stack
// const ThemeSettingsStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name='ThemeSettings' component={ThemeSettings} />
//   </Stack.Navigator>
// );

const Tabs = () => {
  const { colors } = useTheme();
  const { font } = useFont();

  return (
    <Tab.Navigator
      initialRouteName='themes'
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          display: 'flex',
          backgroundColor: colors.backgroundSecondary,
          fontFamily: FontMappings[font].regular,
          height: 80,
          paddingBottom: 10,
          // paddingVertical: 10,
        },
        headerStyle: {
          backgroundColor: colors.backgroundSecondary,
        },
        headerTitleStyle: {
          fontFamily: FontMappings[font].regular,
        },
        tabBarLabelStyle: {
          fontFamily: FontMappings[font].regular,
        },
      })}
    >
      <Tab.Screen
        name='dictionary'
        component={Home} 
        options={{
          title: 'Dictionary',
          tabBarIcon: (props) => (
            <Logo {...props} />
          ),
        }}
      />
      <Tab.Screen
        name='fonts'
        component={FontSettings}
        options={{
          title: 'Font Selection',
          tabBarIcon: (props) => (
            <Ionicons name='text-outline' {...props} />
          ),
        }}
      />
      <Tab.Screen
        name='themes' 
        component={ThemeSettings}
        options={{
          title: 'Theme Selection',
          tabBarIcon: (props) => (
            <IconMoon {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
