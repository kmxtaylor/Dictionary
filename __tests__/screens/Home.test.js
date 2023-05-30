import { render, waitFor, fireEvent } from '@testing-library/react-native';

import Home from 'screens/Home';
import Colors from 'constants/Colors';

jest.setTimeout(10000);
const TIMEOUT = { timeout: 10000 };

describe('dictionary/home screen test suite', () => {
  // test if the app / home screen renders correctly without crashing
  // jest-expo is required
  // uses the presence of a specific element as reference
  test('should render the home screen', async () => {
    const { getByTestId } = render(<Home />)

    await waitFor(() => {
      const homeScreen = getByTestId('home-screen');
      // console.log(homeScreen);
      expect(homeScreen).toBeDefined();
    }, TIMEOUT);
  });


});