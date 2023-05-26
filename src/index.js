// Import the necessary modules
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Svg, Path, Text } from 'react-native-svg';
import { G } from "react-native-svg"

// Import the different screens
import HomeScreen from 'screens/HomeScreen';
import Page1Screen from 'screens/Page1Screen';
import Page2Screen from 'screens/Page2Screen';

/* SVGs for testing */
import IconArrowDown from 'components/svgs/IconArrowDown';
import IconMoon from 'components/svgs/IconMoon';
import IconNewWindow from 'components/svgs/IconNewWindow';
import IconPlay from 'components/svgs/IconPlay';
import IconSearch from 'components/svgs/IconSearch';
import Logo from 'components/svgs/Logo';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create the Home stack
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

// Create the Page1 stack
const Page1Stack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Page1" component={Page1Screen} />
  </Stack.Navigator>
);

// Create the Page2 stack
const Page2Stack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Page2" component={Page2Screen} />
  </Stack.Navigator>
);

// Custom SVG component for the moon icon
const MoonIcon = ({ color, ...rest }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} {...rest}>
    <Path
      fill="none"
      stroke={color ?? '#838383'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
    />
  </Svg>
);

// Custom SVG component for the main icon (book icon)
const MainIcon = ({ color, ...rest }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} {...rest}>
    <G
      fill="none"
      fillRule="evenodd"
      stroke={color ?? "#838383"}
      strokeLinecap="round"
      strokeWidth={1.5}
      transform={"scale(0.67)"}
    >
      <Path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28" />
      <Path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8" />
      <Path d="M11 9h12" />
    </G>
  </Svg>
);

const FontIcon = ({ color, ...rest }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={14} height={8} x={5} y={0} {...rest}>
    <G transform="translate(5, 0)">
    <Path fill="none" stroke={color ?? "#A445ED"} strokeWidth={1.5} d="m1 1 6 6 6-6" />
    <Text
      x="30%"
      y="100%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill={color ?? "#A445ED"}
      fontSize="12"
      fontFamily="Arial"
    >
      Arial
    </Text>
    </G>
  </Svg>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon = null;
            
            if (route.name === 'Settings: Themes') {
              icon = <MoonIcon color={color} width={size} height={size} />;
            } else if (route.name === 'Dictionary') {
              icon = <MainIcon color={color} width={size} height={size} />;
            } else if (route.name === 'Settings: Fonts') {
              icon = <FontIcon color={color} width={size} height={size} />;
            }
            return icon;
          },
        })}
        tabBarStyle={{
          display: 'flex',
        }}
        tabBarActiveTintColor="#000000"
        tabBarInactiveTintColor="#999999"
      >
        <Tab.Screen name="Dictionary" component={HomeStack} />
        <Tab.Screen name="Settings: Fonts" component={Page1Stack} />
        <Tab.Screen name="Settings: Themes" component={Page2Stack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
