import { Text as DefaultText } from 'react-native';
import { useTheme } from 'hooks/useTheme';
import { useFont } from 'hooks/useFont';

import FontMappings from 'constants/FontMappings';

// const FontMappings = {
//   'sans-serif': {
//     regular: 'Inter-Regular',
//     bold: 'Inter-Bold',
//   },
//   serif: {
//     regular: 'Lora-Regular',
//     bold: 'Lora-Bold',
//     boldItalic: 'Lora-BoldItalic',
//   },
//   mono: {
//     regular: 'Inconsolata-Regular',
//     bold: 'Inconsolata-Bold',
//   },
// };

const Text = ({ style, ...rest }) => {
  const { colors } = useTheme();
  const { font } = useFont();

  return (
    <DefaultText
      style={[
        {
          color: colors.text,
          fontFamily: FontMappings[font].regular
        },
        style,
      ]}
      {...rest}
    />
  );
};

const TextBold = ({ style, ...rest }) => {
  const { colors } = useTheme();
  const { font } = useFont();

  // if style is array, flatten it
  if (Array.isArray(style)) {
    style = style.reduce((acc, cur) => {
      return { ...acc, ...cur };
    }, {});
  }

  let fontFam = FontMappings[font].bold;
  if (style?.fontStyle === 'italic' && (font === 'serif' || font === 'mono')) {
    if (FontMappings[font]?.boldItalic) { // lora has separate boldItalic font
      fontFam = FontMappings[font]?.boldItalic;
    }
    style.fontStyle = 'normal'; // lora & mono
  }

  // console.log('Bold font:', fontFam, style?.fontStyle === 'italic', style);

  return (
    <DefaultText
      style={[
        {
          color: colors.text,
          fontFamily: fontFam
        },
        style
      ]}
      {...rest}
    />
  );
};

export { Text, TextBold };
export default Text;
