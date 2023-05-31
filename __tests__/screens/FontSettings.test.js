import { render, waitFor, fireEvent } from '@testing-library/react-native';

import FontSettings from 'screens/FontSettings';
import Colors from 'constants/Colors';

jest.setTimeout(10000);
const TIMEOUT = { timeout: 10000 };

describe('font settings screen test suite', () => {
  // testID='font-settings-screen'

  // test if the app / font settings screen renders correctly without crashing
  test ('should render the font settings screen', async () => {
    const { getByTestId } = render(<FontSettings />)
    await waitFor(() => {
      const fontSettingsScreen = getByTestId('font-settings-screen');
      expect(fontSettingsScreen).toBeDefined();
    }, TIMEOUT);
  });
  
  /*
  test('dummy test', async () => {
  });
  */

});