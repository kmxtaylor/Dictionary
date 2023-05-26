// Import the necessary modules
import { NavigationContainer } from '@react-navigation/native';
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
    <Stack.Screen name="Font Settings" component={FontSettings} />
  </Stack.Navigator>
);

// Create the Theme Settings stack
const ThemeSettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Theme Settings" component={ThemeSettings} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let icon = null;
            
            if (route.name === 'Dictionary') {
              icon = <Logo color={color} />;
            } else if (route.name === 'Settings: Fonts') {
              icon = <IconArrowDown color={color} />;
            } else if (route.name === 'Settings: Themes') {
              icon = <IconMoon color={color} />;
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
        <Tab.Screen name="Settings: Fonts" component={FontSettingsStack} />
        <Tab.Screen name="Settings: Themes" component={ThemeSettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
