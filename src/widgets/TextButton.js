import { Text } from "react-native";
import Button from "./Button"

const TextButton = ({ onPress, enabled, label }) => {
    return <Button
        onPress={onPress}
        enabled={enabled}
    >
        <Text>{label}</Text>
    </Button>
};

export default TextButton;