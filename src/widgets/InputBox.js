import { TextInput } from "react-native";

const InputBox = ({ value, onChange, placeholder="", keyboardType="default", maxLength=200, styles }) => {
  const textStyle = {
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 20,
    fontSize: 20,
    padding: 5,
  };

  return (
    <TextInput
      style={{...textStyle, ...styles}}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  );
};

export default InputBox;
