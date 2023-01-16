import { useState } from "react";
import { View } from "react-native";
import CColors from "../../constants/CColors";
import SpacedColumn from "../../widgets/SpacedColumn";
import CText from "../../widgets/CText";
import InputBox from "../../widgets/InputBox";
import IconButton from "../../widgets/IconButton";
import Title from "../../widgets/Title";
import Header from "../../widgets/Header";

import { getLocation } from "../../../utils/location";

const AvailableParkingMainPage = ({ navigation }) => {
  const [postalCode, onChangePostalCode] = useState("");
  console.log(getLocation());

  return (
    <>
      <Header>
        <CText>Find Available Parking!</CText>
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
        <SpacedColumn alignItems="stretch" width="100%" spacing={15}>
          <CText>Enter a postal code:</CText>
          <InputBox
            value={postalCode}
            onChange={onChangePostalCode}
            keyboardType={"numeric"}
            maxLength={6}
          />
          <IconButton
            label="Find nearby Carparks"
            enabled={postalCode.length === 6}
            onPress={() => {
              navigation.navigate("AvailableParkingResultPage", {
                postalCode: postalCode,
              });
            }}
          />
          <IconButton
            label="Use my location"
            onPress={() => {
              navigation.navigate("AvailableParkingResultPage", {
                postalCode: postalCode,
              });
            }}
          />
        </SpacedColumn>
      </View>
    </>
  );
};

export default AvailableParkingMainPage;
