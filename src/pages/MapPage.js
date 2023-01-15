import { Text } from "react-native";
import PanWindow from "../widgets/PanWindow";
import SpacedColumn from "../widgets/SpacedColumn";

const MapPage = ({ navigation }) => {
    return <PanWindow>
        <SpacedColumn>
            <Text>hi</Text>
            <Text>hi2</Text>
        </SpacedColumn>
    </PanWindow>;
};

export default MapPage;