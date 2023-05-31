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

  
  // test if the app / home screen have the right background color
  test('should have the right background color', async () => {
    const { getByTestId } = render(<Home />)
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