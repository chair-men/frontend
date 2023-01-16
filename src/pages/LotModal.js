import { View } from "react-native";
import CColors from "../constants/CColors";

const LotModal = ({ navigation, route }) => {
    const { lot } = route.params;
    
    return <View
        style={{
            flex: 1,
            backgroundColor: 'rgba(209, 209, 209, 0.4)',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40
        }}
    >
        <View
            style={{
                width: '100%',
                height: '100%',
                borderRadius: 20,
                backgroundColor: CColors.backdrop
            }}
        >
            {/**/}
        </View>
    </View>;
};

export default LotModal;