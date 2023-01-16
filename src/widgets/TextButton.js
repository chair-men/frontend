import { Text } from "react-native";
import Button from "./Button"

const TextButton = ({ onPress, enabled, label, styles, textStyle }) => {
    return <Button
        onPress={onPress}
        enabled={enabled}
        styles={styles}
    >
        <Text style={textStyle}>{label}</Text>
    </Button>
};

export default TextButton;