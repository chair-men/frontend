import { ActivityIndicator } from "react-native";
import CText from "../../widgets/CText";
import { useState } from "react";
import { getCPOccupied, getCPVacant } from "../../api";
import HeaderLayout from "../../widgets/HeaderLayout";
import SearchResults from "../../widgets/SearchResults";

const ResultPage = ({ navigation, route }) => {
  const { licensePlate, postalCode, coords } = route.params;

  const effect = (carpark, _, setDetailedInfo, setWarningMessage, setLicensePlate) => {
    setDetailedInfo(<ActivityIndicator />);

    getCPOccupied(carpark.id)
      .then(({ data }) => {
        const lvlInfo = [];
        if (data.status) Object.entries(data.status)
          .forEach(([lvlId, val], i) => {
            if (val.occupied > 0) lvlInfo.push(lvlId);
          });
        
        if (lvlInfo.length > 0) {
          setLicensePlate(licensePlate);
          setDetailedInfo(lvlInfo);
        } else {
          setWarningMessage('there are no vehicles here.');
          setDetailedInfo();
        }
      })
      .catch((e) => {
        console.log(e);
        setWarningMessage('unable to determine carpark status.');
        setDetailedInfo();
      });
  };

  return <HeaderLayout
    headerComponent={<CText>
      Showing results for{" "}
      <CText styles={{ fontWeight: "bold" }}>{postalCode ? postalCode : 'your current location'}</CText>
    </CText>}
  >
    <SearchResults 
        navigation={navigation}
        postalCode={postalCode}
        coords={coords}
        effect={effect}
      />
  </HeaderLayout>;
};

export default ResultPage;
