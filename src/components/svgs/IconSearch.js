import Svg, { Path } from "react-native-svg"
const IconSearch = ({ color, ...rest }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} {...rest}>
    <Path
      fill="none"
      stroke={color ?? "#A445ED"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
    />
  </Svg>
);
export default IconSearch;
