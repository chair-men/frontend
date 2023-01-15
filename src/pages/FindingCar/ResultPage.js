import { View } from "react-native";
import SpacedColumn from "../../widgets/SpacedColumn";
import CText from "../../widgets/CText";
import Header from "../../widgets/Header";
import CarparkDisplay from "../../widgets/CarparkDisplay";
import CColors from "../../constants/CColors";
import TextButton from "../../widgets/TextButton";

const ResultPage = ({ route, navigation }) => {
  const { licencePlate } = route.params;
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: CColors.backdrop,
        height: "100%",
      }}
    >
      <SpacedColumn alignItems="stretch" spacing={20}>
        <CText>Your car is at:</CText>
        <CText styles={{ fontWeight: "bold", fontSize: 28 }}>
          328 Clementi Ave 2, {"\n"}Block 348 Carpark, {"\n"}Level 3 - Lot 49
        </CText>
        <TextButton
          label="View on Map"
          onPress={() => {
            navigation.navigate("MapPage");
          }}
        />
      </SpacedColumn>
    </View>
  );
};

export default ResultPage;
