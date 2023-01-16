import Button from "./Button";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import SpacedRow from "./SpacedRow";
import { Text } from "react-native";

const IconButton = ({ onPress, enabled, label, iconName, styles }) => {
    return <Button
        enabled={enabled}
        onPress={onPress}
        styles={styles}
    >
        <SpacedRow>
            <Text>{label}</Text>
            <FontAwesome5 name={iconName} size={18} />
        </SpacedRow>
    </Button>
};

export default IconButton;