import { View } from "react-native";
import CText from "../../widgets/CText";
import TextButton from "../../widgets/TextButton";

const ConfirmSave = ({ navigation, route }) => {
  const { licensePlate } = route.params;

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 50,
        backgroundColor: CColors.backdrop,
      }}
    >
      <CText styles={{ marginVertical: 20, fontSize: 25 }}>
        The selected lot has been saved for '{licensePlate}'.
      </CText>
      <CText styles={{ marginVertical: 20, fontSize: 25 }}>
        Use 'Find My Car' under 'Parking Helper' to find your car later on.
      </CText>
      <TextButton
        label={"Go Back"}
        onPress={() => {
          navigation.navigate("EntryPage");
        }}
        styles={{ width: "70%", marginVertical: 40, }}
        textStyle={{ fontSize: 20, }}
      />
    </View>
  );
};

export default ConfirmSave;
