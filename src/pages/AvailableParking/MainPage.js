import { useState } from "react";
import { View } from "react-native";
import CColors from "../../constants/CColors";
import SpacedColumn from "../../widgets/SpacedColumn";
import CText from "../../widgets/CText";
import InputBox from "../../widgets/InputBox";
import IconButton from "../../widgets/IconButton";
import Header from "../../widgets/Header";
import LocationButton from "../../widgets/LocationButton";

const AvailableParkingMainPage = ({ navigation }) => {
  const [postalCode, onChangePostalCode] = useState("");
  const [ errorMsg, setErrorMsg ] = useState();

  const submitPostal = (postal) => {
    setErrorMsg();
    onChangePostalCode('');
    
    const validPostalMsg = 'Please enter a valid postal code (only 6 digits).';

    postal = postal.replace(/\D/g, '');
    if (postal.length !== 6) {
      setErrorMsg(validPostalMsg);
      return;
    }

    navigation.navigate("AvailableParkingResultPage", {
      postalCode: postalCode,
    });
  };

  const useCoords = (coords) => {
    if (!coords) {
      setErrorMsg('Please check your location settings and try again.');
      return;
    }

    navigation.navigate("AvailableParkingResultPage", {
      coords: coords
    })
  };

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
          {errorMsg && <CText styles={{ color: 'red' }}>{errorMsg}</CText>}
          <IconButton
            label="Find nearby Carparks"
            enabled={postalCode.length === 6}
            onPress={() => submitPostal(postalCode)}
          />
          <LocationButton 
            onStart={() => setErrorMsg()}
            onComplete={(coords) => useCoords(coords)}
          />
        </SpacedColumn>
      </View>
    </>
  );
};

export default AvailableParkingMainPage;
