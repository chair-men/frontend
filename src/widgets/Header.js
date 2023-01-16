import { View } from "react-native";
import CColors from "../constants/CColors";

const Header = ({ children }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: 'row',
        width: "100%",
        alignItems: "center",
        backgroundColor: CColors.header,
        padding: 20,
        justifyContent: 'space-around'
      }}
    >
      {children}
    </View>
  );
};

export default Header;
