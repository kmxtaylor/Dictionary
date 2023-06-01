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

  // test if the user is able to get the definition of a word
  test('should get all definitions when a word is typed in the search bar', async () => {
    const { getByTestId, getByPlaceholderText, getByText, getAllByText } = render(<Home />);
    
    // enter the word "example" in the search input
    const searchInput = getByPlaceholderText('Enter a word...');
    fireEvent.changeText(searchInput, 'example');

    // press the search button
    const searchButton = getByTestId('search-button');
    fireEvent.press(searchButton);

    // wait for the data to load
    await waitFor(() => {
      const foundWord = getByText('example');
      const definitionComponents = getAllByText(/Something that is representative of all such things in a group./);
      expect(foundWord).toBeDefined();
      expect(definitionComponents.length).toBeGreaterThan(0);
    }, TIMEOUT);
  });

  // test if an error message is displayed when the user enters a blank search
  test('should display an error message when the user enters a blank search', async () => {
    const { getByTestId, getByText } = render(<Home />);
  
    // press the search button without entering any text in the search input
    const searchButton = getByTestId('search-button');
    fireEvent.press(searchButton);

    // wait for the error message to be displayed
    await waitFor(() => {
      const errorMessage = getByText("Search can't be blank.");
      expect(errorMessage).toBeDefined();
    }, TIMEOUT);
  });

  // test if the an error message is displayed when the user enters a word that is not in the dictionary
  test('should display error message when a word that is not in the dictionary is entered', async () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<Home />);

    // enter a word that is not in the dictionary in the search input
    const searchInput = getByPlaceholderText('Enter a word...');
    fireEvent.changeText(searchInput, 'asdfghjkl');

    // press the search button
    const searchButton = getByTestId('search-button');
    fireEvent.press(searchButton);

    // wait for the error message to be displayed
    await waitFor(() => {
      const errorMessage = getByText('Word not found. Try a different word.');
      expect(errorMessage).toBeDefined();
    }, 15000);
  });
     





  

});