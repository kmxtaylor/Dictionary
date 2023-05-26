export const white = '#FFFFFF';
export const gray = '#757575';
export const grayDark = '#3A3A3A';
export const grayLight = '#E9E9E9';
export const grayLightest = '#F4F4F4';
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
    backgroundSecondary: grayLightest,

    // primary: '#0079ff',
    // primaryHover: '#60abff',

    accent: purple,
    error: red,

    tabBarActive: purple,
    tabBarInactive: gray,
  },
  dark: {
    text: white,

    background: black,
    backgroundSecondary: '#1F1F1F',
    // backgroundSecondary: '#2D2D2D',

    accent: purple,
    error: red,

    tabBarActive: purple,
    tabBarInactive: gray,
  },
};

export default Themes;
