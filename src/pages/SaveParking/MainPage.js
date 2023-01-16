import { useState } from "react";
import { View } from "react-native";
import CColors from "../../constants/CColors";
import SpacedColumn from "../../widgets/SpacedColumn";
import Header from "../../widgets/Header";
import InputField from "../../widgets/InputField";
import TextButton from "../../widgets/TextButton";
import CText from "../../widgets/CText";
import LocationButton from "../../widgets/LocationButton";

const MainPage = ({ navigation }) => {
  const [licensePlate, onChangeLicensePlate] = useState("");
  const [postalCode, onChangePostalCode] = useState("");

  return (
    <>
      <Header>
        <CText>Save your car location!</CText>
      </Header>
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
            value={licensePlate}
            onChange={(newVal) => onChangeLicensePlate(newVal.toLocaleUpperCase())}
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
            enabled={licensePlate.length > 0 && licensePlate.length <= 8 && postalCode.length === 6}
            onPress={() => {
              navigation.navigate("SaveParkingResultPage", {
                postalCode: postalCode,
                licensePlate: licensePlate,
              });
            }}
          />
          <LocationButton 
            enabled={licensePlate.length > 0 && licensePlate.length <= 8}
            onComplete={(coords) => {
              navigation.navigate("SaveParkingResultPage", {
                coords: coords,
                licensePlate: licensePlate
              });  
            }}
          />
        </SpacedColumn>
      </View>
    </>
  );
};

export default MainPage;
