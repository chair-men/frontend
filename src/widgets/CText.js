import { Text } from "react-native";

const CText = ({ children, styles }) => {
  const textStyle = {
    textAlign: "center",
    fontSize: 20,
    // minHeight: 30,
    // maxHeight: 30,
  };

  return <Text style={{ ...textStyle, ...styles }}>{children}</Text>;
};

export default CText;
