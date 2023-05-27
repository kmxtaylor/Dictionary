const white = '#FFFFFF';
const grayLightest = '#F4F4F4';
const grayLight = '#E9E9E9';
const gray = '#757575';
const grayDark = '#3A3A3A';
const black = '#050505';
const purple = '#A445ED';
const red = '#FF5252';

const Themes = {
  light: {
    text: black,
    // textMidContrast: '#4b6a9b',
    // textLowContrast: '#697c9a',
    // textSearchPlaceholder: '#4b6a9b',

    line: grayLight,
    subHeading: gray,

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

    line: grayLight,
    subHeading: gray,

    background: black,
    backgroundSecondary: '#1F1F1F',
    // backgroundSecondary: '#2D2D2D',

    accent: purple,
    error: red,

    tabBarActive: purple,
    tabBarInactive: gray,
  },
};

export { Themes, white, gray, grayDark, grayLight, grayLightest, black, purple, red};
export default Themes;
