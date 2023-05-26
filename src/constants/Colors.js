export const white = '#FFFFFF';
export const gray = '#757575';
export const black = '#050505';
export const purple = '#A445ED';
export const red = '#FF5252';

const Themes = {
  light: {
    text: black,
    // textMidContrast: '#4b6a9b',
    // textLowContrast: '#697c9a',
    // textSearchPlaceholder: '#4b6a9b',

    background: white,
    // backgroundSecondary: '#fefefe',

    // primary: '#0079ff',
    // primaryHover: '#60abff',

    error: red,

    tabBarActive: purple,
    tabBarInactive: gray,
  },
  dark: {
    text: white,

    background: black,

    error: red,

    tabBarActive: purple,
    tabBarInactive: gray,
  },
};

export default Themes;
