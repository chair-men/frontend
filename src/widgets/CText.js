import { Text } from "react-native";

const CText = ({ children, styles={} }) => {
  const textStyle = {
    textAlign: "center",
    fontSize: 20,
    ...styles,
  };

  return <Text style={textStyle}>{children}</Text>;
};

export default CText;
