import { render, waitFor, fireEvent } from '@testing-library/react-native';

import FontSettings from 'screens/FontSettings';
import Colors from 'constants/Colors';

jest.setTimeout(10000);
const TIMEOUT = { timeout: 10000 };

describe('font settings screen test suite', () => {
  // test if the app / font settings screen renders correctly without crashing
  test ('should render the font settings screen', async () => {
    const { getByTestId } = render(<FontSettings />)
    await waitFor(() => {
      const fontSettingsScreen = getByTestId('font-settings-screen');
      expect(fontSettingsScreen).toBeDefined();
    }, TIMEOUT);
  });
  
  // test if the app / font settings screen have the right background color
  test('should have the right background color', async () => {
    const { getByTestId } = render(<FontSettings />)
    const themeColor = getByTestId('font-settings-screen');
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