import { View } from "react-native";
import CColors from "../constants/CColors";

const Header = ({ children }) => {
  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        backgroundColor: CColors.header,
        padding: 20,
        marginBottom: 30,
      }}
    >
      {children}
    </View>
  );
};

export default Header;
