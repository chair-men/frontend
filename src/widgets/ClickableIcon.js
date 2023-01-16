import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Button from "./Button";

const ClickableIcon = ({ iconName, onPress, styles }) => {
    styles = styles || { backgroundColor: 'transparent' };
    
    return <Button
        onPress={() => onPress()}
        styles={styles}
    >
        <FontAwesome5 name={iconName} size={22} />
    </Button>
};

export default ClickableIcon;