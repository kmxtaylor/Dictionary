import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'contexts/Theme';
import { FontProvider } from 'contexts/Font';
import RootNavigation from 'navigation/RootNavigation';

const App = () => {
  return (
    <SafeAreaProvider testID='app'>
      <ThemeProvider>
        <FontProvider>
          <RootNavigation />
        </FontProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
