import Svg, { Path } from "react-native-svg"
const IconNewWindow = ({ color, ...rest }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} {...rest}>
    <Path
      fill="none"
      stroke={color ?? "#838383"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
    />
  </Svg>
);
export default IconNewWindow;
