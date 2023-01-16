import { useState } from "react";
import { View } from "react-native";
import CColors from "../../constants/CColors";
import SpacedColumn from "../../widgets/SpacedColumn";
import CText from "../../widgets/CText";
import InputBox from "../../widgets/InputBox";
import IconButton from "../../widgets/IconButton";
import Header from "../../widgets/Header";

const MainPage = ({ navigation }) => {
  const [licensePlate, onChangeLicensePlate] = useState("");

  return (
    <>
      <Header>
        <CText>Find Your Car!</CText>
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
          <CText>Enter your license plate:</CText>
          <InputBox
            value={licensePlate}
            onChange={onChangeLicensePlate}
            maxLength={8}
          />

          <IconButton
            label="Find your car"
            enabled={licensePlate.length <= 8}
            onPress={() => {
              navigation.navigate("FindingCarResultPage", {
                licensePlate: licensePlate.toLocaleUpperCase(),
              });
            }}
          />
        </SpacedColumn>
      </View>
    </>
  );
};

export default MainPage;
