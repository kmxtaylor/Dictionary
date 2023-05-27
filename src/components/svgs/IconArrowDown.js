import Svg, { Path } from "react-native-svg"
const IconArrowDown = ({ color, ...rest }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={14} height={8} {...rest}>
    <Path fill="none" stroke={color ?? "#A445ED"} strokeWidth={1.5} d="m1 1 6 6 6-6" />
  </Svg>
);
export default IconArrowDown;