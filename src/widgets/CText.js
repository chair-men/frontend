import { Text } from "react-native";

const CText = ({ children }) => {
  const textStyle = {
    textAlign: "center",
    fontSize: 20,
  };

  return <Text style={textStyle}>{children}</Text>;
};

export default CText;
