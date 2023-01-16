import { ActivityIndicator, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import SpacedColumn from "../../widgets/SpacedColumn";
import InputBox from "../../widgets/InputBox";
import { useEffect, useState } from "react";
import CColors from "../../constants/CColors";
import { getLocation } from "../../../utils/location";
import CText from "../../widgets/CText";
import HeaderLayout from "../../widgets/HeaderLayout";
import SearchResults from "../../widgets/SearchResults";
import { getCP } from "../../api";

const ResultPage = ({ route, navigation }) => {
  const [ searchingCoords, setSearchingCoords ] = useState(true);
  const [ postalCodeVal, onChangePostalCodeVal] = useState("");
  const [ userPostalCode, setUserPostalCode ] = useState("");
  const [ userCoords, setUserCoords ] = useState();

  useEffect(() => {
    getLocation().then((loc) => {
      const { latitude, longitude } = loc.coords;
      setUserCoords({ lat: latitude, lng: longitude });
      setSearchingCoords(false);
    }).catch((_) => {
        setSearchingCoords(false);
    });
  }, []);

  const effect = (carpark, _, setDetailedInfo, setWarningMessage, __) => {
    getCP(carpark.id)
      .then(({ data }) => {
        setDetailedInfo(Object.keys(data.status));
      })
      .catch((_) => {
        setWarningMessage('unable to determine carpark levels.');
        setDetailedInfo();
      });
  };

  if (searchingCoords) return <View
    style={{
      flex: 1,
      backgroundColor: CColors.backdrop,
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <SpacedColumn>
      <ActivityIndicator size='large' />
      <CText>determining your location...</CText>
    </SpacedColumn>
  </View>;

  return <HeaderLayout
    headerComponent={<>
    <FontAwesome5 name={"search"} size={18} />
      <InputBox
        value={postalCodeVal}
        onChange={(postal) => {
          onChangePostalCodeVal(postal);
          postal = postal.replace(/\D/g, '');
          if (postal.length === 6) setUserPostalCode(postal);
          else setUserPostalCode("");
        }}
        placeholder={"Find other carparks"}
        styles={{
          width: "90%",
          textAlign: "left",
          backgroundColor: CColors.header,
        }}
        keyboardType="numeric"
        maxLength={6}
      />
    </>}

    backFn={() => navigation.pop()}
  >
    <SearchResults
      navigation={navigation}
      postalCode={userPostalCode}
      coords={userPostalCode ? undefined : userCoords}
      effect={effect}
    />
  </HeaderLayout>;
};

export default ResultPage;
