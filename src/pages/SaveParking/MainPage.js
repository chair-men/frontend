import { useState } from "react";
import { View } from "react-native";
import CColors from "../../constants/CColors";
import SpacedColumn from "../../widgets/SpacedColumn";
import Header from "../../widgets/Header";
import InputField from "../../widgets/InputField";
import TextButton from "../../widgets/TextButton";
import CText from "../../widgets/CText";
import LocationButton from "../../widgets/LocationButton";
import HeaderLayout from "../../widgets/HeaderLayout";

const MainPage = ({ navigation }) => {
  const [licensePlate, onChangeLicensePlate] = useState("");
  const [postalCode, onChangePostalCode] = useState("");

  return (
    <HeaderLayout
        headerComponent={<CText>Save your car location!</CText>}
        backFn={() => navigation.pop()}
    >
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
            onChange={onChangeLicensePlate}
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
                licensePlate: licensePlate.toLocaleUpperCase(),
              });
            }}
          />
          <LocationButton 
            enabled={licensePlate.length > 0 && licensePlate.length <= 8}
            onComplete={(coords) => {
              navigation.navigate("SaveParkingResultPage", {
                coords: coords,
                licensePlate: licensePlate.toLocaleUpperCase()
              });  
            }}
          />
        </SpacedColumn>
      </View>
    </HeaderLayout>
  );
};

export default MainPage;
