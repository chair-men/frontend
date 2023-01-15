import { useState } from "react";
import { View } from "react-native";
import CColors from "../../constants/CColors";
import SpacedColumn from "../../widgets/SpacedColumn";

import InputField from "../../widgets/InputField";
import TextButton from "../../widgets/TextButton";

const MainPage = ({ navigation }) => {
  const [licencePlate, onChangeLicencePlate] = useState("");
  const [postalCode, onChangePostalCode] = useState("");

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
      <SpacedColumn alignItems="stretch" width="100%" spacing={30}>
        <InputField
          text={"Enter your licence plate:"}
          value={licencePlate}
          onChange={onChangeLicencePlate}
          maxLength={8}
        />

        <InputField
          text={"Enter a postal code:"}
          value={postalCode}
          onChange={onChangePostalCode}
          keyboardType={"numeric"}
          maxLength={6}
        />

        <TextButton
          label="Find nearby Carparks"
          enabled={licencePlate.length === 8 && postalCode.length === 6}
          onPress={() => {
            navigation.navigate("SaveParkingResultPage", {
              postalCode: postalCode,
              licencePlate: licencePlate,
            });
          }}
        />

        <TextButton
          label="Use my location"
          enabled={licencePlate.length === 8}
          onPress={() => {
            navigation.navigate("SaveParkingResultPage", {
              postalCode: postalCode,
              licencePlate: licencePlate,
            });
          }}
        />
      </SpacedColumn>
    </View>
  );
};

export default MainPage;
