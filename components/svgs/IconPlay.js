import Svg, { G, Circle, Path } from "react-native-svg"
const IconPlay = ({ color, ...rest }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={75} height={75} {...rest}>
    <G fill={color ?? "#A445ED"} fillRule="evenodd">
      <Circle cx={37.5} cy={37.5} r={37.5} opacity={0.25} />
      <Path d="M29 27v21l21-10.5z" />
    </G>
  </Svg>
);
export default IconPlay;