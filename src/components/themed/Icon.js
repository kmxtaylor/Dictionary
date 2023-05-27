import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from 'hooks/useTheme';

const Icon = ({ name, size, color, ...rest }) => {
  const { colors } = useTheme();

  return (
    <Ionicons
      name={name}
      size={size}
      {...rest}
      color={color ? color : colors.text}
    />
  );
};

export default Icon;
export { Icon };