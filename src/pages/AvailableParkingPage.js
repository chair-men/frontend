import { useState } from "react";
import { View, TextInput } from "react-native";
import CColors from "../constants/CColors";
import SpacedColumn from "../widgets/SpacedColumn";
import CText from "../widgets/CText";

const AvailableParkingPage = () => {
  const [postalCode, onChangePostalCode] = useState();

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
      <SpacedColumn alignItems="stretch" width="100%">
        <CText>Enter a postal code:</CText>
        <TextInput
          onChangeText={onChangePostalCode}
          value={postalCode}
          placeholder=""
        />
      </SpacedColumn>
    </View>
  );
};

export default AvailableParkingPage;
