import { render, waitFor, fireEvent } from '@testing-library/react-native';

import FontSettings from 'screens/FontSettings';
import FontMappings from 'constants/FontMappings';

import { FontProvider } from 'contexts/Font';

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

describe('font settings screen test suite', () => {
  // test if the app / font settings screen renders correctly without crashing
  test ('should render the font settings screen', async () => {
    const { getByTestId } = render(<FontSettings />)
    await waitFor(() => {
      const fontSettingsScreen = getByTestId('font-settings-screen');
      expect(fontSettingsScreen).toBeDefined();
    }, TIMEOUT);
  });
  
  // test setting font to sans-serif font
  test('should set font to sans-serif font', async () => {
    const { getByTestId, getByText } = render(
      <FontProvider>
        <FontSettings />
      </FontProvider>
    );

    await waitFor(() => {
      // press button w/ text 'sans-serif'
      const sansSerifThemeButton = getByText('sans-serif');
      fireEvent.press(sansSerifThemeButton);

      // check that btn text font matches sans-serif font
      let btnText = flattenStyle(sansSerifThemeButton);

      // console.log(btnText);
      // console.log(FontMappings['sans-serif']);
      expect(btnText.fontFamily).toEqual(FontMappings['sans-serif'].regular);
    }, TIMEOUT);
  });

  // test setting font to serif font
  test('should set font to serif font', async () => {
    const { getByTestId, getByText } = render(
      <FontProvider>
        <FontSettings />
      </FontProvider>
    );

    await waitFor(() => {
      // press button w/ text 'serif'
      const serifThemeButton = getByText('serif');
      fireEvent.press(serifThemeButton);

      // check that btn text font matches serif font
      let btnText = flattenStyle(serifThemeButton);

      // console.log(btnText);
      // console.log(FontMappings['serif']);
      expect(btnText.fontFamily).toEqual(FontMappings['serif'].regular);
    }, TIMEOUT);
  });

  // test setting font to mono font
  test('should set font to mono font', async () => {
    const { getByTestId, getByText } = render(
      <FontProvider>
        <FontSettings />
      </FontProvider>
    );

    await waitFor(() => {
      // press button w/ text 'mono'
      const serifThemeButton = getByText('mono');
      fireEvent.press(serifThemeButton);

      // check that btn text font matches mono font
      let btnText = flattenStyle(serifThemeButton);

      // console.log(btnText);
      // console.log(FontMappings['mono']);
      expect(btnText.fontFamily).toEqual(FontMappings['mono'].regular);
    }, TIMEOUT);
  });

  // test changing to each font in succession
  test('should be able to change to each font in succession', async () => {
    const { getByTestId, getByText } = render(
      <FontProvider>
        <FontSettings />
      </FontProvider>
    );

    // test sans-serif font
    await waitFor(() => {
      const sansSerifThemeButton = getByText('sans-serif');
      fireEvent.press(sansSerifThemeButton);

      let btnText = flattenStyle(sansSerifThemeButton);
      expect(btnText.fontFamily).toEqual(FontMappings['sans-serif'].regular);
    }, TIMEOUT);

    // test serif font
    await waitFor(() => {
      const serifThemeButton = getByText('serif');
      fireEvent.press(serifThemeButton);

      let btnText = flattenStyle(serifThemeButton);
      expect(btnText.fontFamily).toEqual(FontMappings['serif'].regular);
    }, TIMEOUT);

    // test mono font
    await waitFor(() => {
      const serifThemeButton = getByText('mono');
      fireEvent.press(serifThemeButton);

      let btnText = flattenStyle(serifThemeButton);
      expect(btnText.fontFamily).toEqual(FontMappings['mono'].regular);
    }, TIMEOUT);
  });
});