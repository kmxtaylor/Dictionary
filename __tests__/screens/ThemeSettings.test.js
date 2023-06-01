import { render, waitFor, fireEvent } from '@testing-library/react-native';

import ThemeSettings from 'screens/ThemeSettings';
import Colors from 'constants/Colors';

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

  // test if the app / theme settings screen have the right background color
  test('should have the right background color', async () => {
    const { getByTestId } = render(<ThemeSettings />)
    const themeColor = getByTestId('current-background-color');
    let style ={};
    await waitFor(() => {
      if (Array.isArray(themeColor.props.style)) {
        style = themeColor.props.style.reduce((acc, cur) => {
          return {...acc, ...cur};
        }, {});
      } else {
        style = themeColor.props.style;
      }
      expect(style.backgroundColor).toEqual('#050505');
    }, TIMEOUT);
  });
  
});