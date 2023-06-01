import { render, waitFor, fireEvent } from '@testing-library/react-native';

import ThemeSettings from 'screens/ThemeSettings';
import Colors from 'constants/Colors';

import { ThemeProvider } from 'contexts/Theme';
import { useTheme } from 'hooks/useTheme';

jest.setTimeout(10000);
const TIMEOUT = { timeout: 10000 };

describe('theme settings screen test suite', () => {
  // testID='theme-settings-screen'

  // test if the app / theme settings screen renders correctly without crashing
  test('should render the theme settings screen', async () => {
    const { getByTestId } = render(<ThemeSettings />)
    await waitFor(() => {
      const themeSettingsScreen = getByTestId('theme-settings-screen');
      expect(themeSettingsScreen).toBeDefined();
    }, TIMEOUT);
  });

  // test changing theme (background color) from dark to light (if the screen starts w/ the dark background color & can be changed to color light background color)
  test('should have the right background color', async () => {
    // const { theme, colors } = useTheme();

    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <ThemeSettings />
      </ThemeProvider>
    );

    // check that background started on dark theme
    await waitFor(() => {
      const themeSettingsScreen = getByTestId('theme-settings-screen');
      // console.log(themeSettingsScreen.props.style);
      let style ={};

      // flatten style array to single obj
      if (Array.isArray(themeSettingsScreen.props.style)) {
        style = themeSettingsScreen.props.style.reduce((acc, cur) => {
          return {...acc, ...cur};
        }, {});
      } else {
        style = themeSettingsScreen.props.style;
      }
      // console.log('initial background (#050505)', style.backgroundColor);
      // console.log(`Colors['dark']`, Colors['dark']);
      expect(style.backgroundColor).toEqual(Colors['dark'].background);
    }, TIMEOUT);

    // press button w/ text 'light'
    await waitFor(() => {
      const lightThemeButton = getByText('light');
      // console.log(lightThemeButton);
      fireEvent.press(lightThemeButton);
    }, TIMEOUT);

    // check that background changed to light theme
    await waitFor(() => {
      const themeSettingsScreen = getByTestId('theme-settings-screen');
      // console.log(themeSettingsScreen.props.style);
      let style ={};

      // flatten style array to single obj
      if (Array.isArray(themeSettingsScreen.props.style)) {
        style = themeSettingsScreen.props.style.reduce((acc, cur) => {
          return {...acc, ...cur};
        }, {});
      } else {
        style = themeSettingsScreen.props.style;
      }
      console.log('background (#FFFFFF)', style.backgroundColor);
      console.log(`Colors['light']`, Colors['light']);
      expect(style.backgroundColor).toEqual(Colors['light'].background);
    }, TIMEOUT);

  });

});