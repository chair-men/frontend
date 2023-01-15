import CText from "./CText";
import InputBox from "./InputBox";
import SpacedColumn from "./SpacedColumn";

const InputField = ({ text, value, onChange, keyboardType, maxLength }) => {
  return (
    <SpacedColumn alignItems="stretch" width="100%" spacing={10}>
      <CText>{text}</CText>
      <InputBox
        value={value}
        onChange={onChange}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </SpacedColumn>
  );
};

export default InputField;
