import { render, waitFor, fireEvent } from '@testing-library/react-native';

import ThemeSettings from 'screens/ThemeSettings';
import Colors from 'constants/Colors';

import { ThemeProvider } from 'contexts/Theme';

jest.setTimeout(10000);
const TIMEOUT = { timeout: 10000 };

// helper function to flatten style array to single obj
const flattenStyle = (node) => {
  if (Array.isArray(node.props.style)) {
    style = node.props.style.reduce((acc, cur) => {
      return {...acc, ...cur};
    }, {});
  } else {
    style = node.props.style;
  }
  return style;
};

describe('theme settings screen test suite', () => {
  // test if the theme settings screen renders correctly without crashing
  test('should render the theme settings screen', async () => {
    const { getByTestId } = render(<ThemeSettings />)
    await waitFor(() => {
      const themeSettingsScreen = getByTestId('theme-settings-screen');
      expect(themeSettingsScreen).toBeDefined();
    }, TIMEOUT);
  });

  // test setting theme to dark
  test('should set theme to dark', async () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <ThemeSettings />
      </ThemeProvider>
    );

    await waitFor(() => {
      // press button w/ text 'dark'
      const darkThemeButton = getByText('dark');
      fireEvent.press(darkThemeButton);

      // check that background & text matches dark theme
      const themeSettingsScreen = getByTestId('theme-settings-screen');
      let bg = flattenStyle(themeSettingsScreen);
      let btnText = flattenStyle(darkThemeButton);

      // console.log(bg);
      // console.log(btnText);
      // console.log(Colors['dark']);
      expect(bg.backgroundColor).toEqual(Colors['dark'].background);
      expect(btnText.color).toEqual(Colors['dark'].text);
    }, TIMEOUT);
  });

  // test setting theme to light
  test('should set theme to light', async () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <ThemeSettings />
      </ThemeProvider>
    );

    await waitFor(() => {
      // press button w/ text 'light'
      const lightThemeButton = getByText('light');
      fireEvent.press(lightThemeButton);

      // check that background & text matches light theme
      const themeSettingsScreen = getByTestId('theme-settings-screen');
      let bg = flattenStyle(themeSettingsScreen);
      let btnText = flattenStyle(lightThemeButton);

      // console.log(bg);
      // console.log(btnText);
      // console.log(Colors['light']);
      expect(bg.backgroundColor).toEqual(Colors['light'].background);
      expect(btnText.color).toEqual(Colors['light'].text);
    }, TIMEOUT);
  });

  // test changing theme (background color) from dark to light (if the screen starts w/ the dark background color & can be changed to color light background color)
  test('should check change background colors in succession', async () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <ThemeSettings />
      </ThemeProvider>
    );

    // --> dark theme
    await waitFor(() => {
      // press button w/ text 'dark'
      const darkThemeButton = getByText('dark');
      fireEvent.press(darkThemeButton);

      // check that background & text matches dark theme
      const themeSettingsScreen = getByTestId('theme-settings-screen');
      let bg = flattenStyle(themeSettingsScreen);
      let btnText = flattenStyle(darkThemeButton);

      expect(bg.backgroundColor).toEqual(Colors['dark'].background);
      expect(btnText.color).toEqual(Colors['dark'].text);
    }, TIMEOUT);

    // --> light theme
    await waitFor(() => {
      // press button w/ text 'light'
      const lightThemeButton = getByText('light');
      fireEvent.press(lightThemeButton);

      // check that background & text matches light theme
      const themeSettingsScreen = getByTestId('theme-settings-screen');
      let bg = flattenStyle(themeSettingsScreen);
      let btnText = flattenStyle(lightThemeButton);

      expect(bg.backgroundColor).toEqual(Colors['light'].background);
      expect(btnText.color).toEqual(Colors['light'].text);
    }, TIMEOUT);
  });
});