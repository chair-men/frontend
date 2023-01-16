import { useState } from "react";
import { View } from "react-native";
import CColors from "../../constants/CColors";
import SpacedColumn from "../../widgets/SpacedColumn";
import CText from "../../widgets/CText";
import InputBox from "../../widgets/InputBox";
import IconButton from "../../widgets/IconButton";

const MainPage = ({ navigation }) => {
  const [licencePlate, onChangeLicencePlate] = useState('');

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
      <SpacedColumn alignItems="stretch" width="100%" spacing={15}>
        <CText>Enter your licence plate:</CText>
        <InputBox
          value={licencePlate}
          onChange={onChangeLicencePlate}
          maxLength={8}
        />

        <IconButton 
            label='Find your car'
            enabled={licencePlate.length <= 8}
            onPress={() => {
              navigation.navigate('FindingCarResultPage', { licencePlate: licencePlate })
            }}
        />
      </SpacedColumn>
    </View>
  );
};

export default MainPage;
