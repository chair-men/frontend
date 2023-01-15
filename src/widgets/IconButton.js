import Button from "./Button";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import SpacedRow from "./SpacedRow";
import { Text } from "react-native";

const IconButton = ({ onPress, enabled, label, iconName }) => {
    return <Button
        enabled={enabled}
        onPress={onPress}
    >
        <SpacedRow>
            <Text>{label}</Text>
            <FontAwesome5 name={iconName} />
        </SpacedRow>
    </Button>
};

export default IconButton;