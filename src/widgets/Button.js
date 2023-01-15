import { TouchableOpacity, View } from "react-native";
import CColors from "../constants/CColors";

const Button = ({ children, onPress, enabled }) => {
  if (enabled === undefined) enabled = onPress; //enable button by default
  const bStyle = {
    display: "flex",
    borderRadius: 20,
    padding: 10,
    backgroundColor: CColors.button,
    alignItems: "center",
    jusitfyContent: "center",
  };

  if (enabled)
    return (
      <TouchableOpacity style={bStyle} onPress={() => onPress()}>
        {children}
      </TouchableOpacity>
    );

  return <View style={bStyle}>{children}</View>;
};

export default Button;
