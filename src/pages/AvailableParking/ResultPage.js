import { ActivityIndicator } from "react-native";
import CText from "../../widgets/CText";
import { getCPVacant } from "../../api";
import SearchResults from "../../widgets/SearchResults";
import HeaderLayout from "../../widgets/HeaderLayout";

const ResultPage = ({ navigation, route }) => {
  const { postalCode, coords } = route.params;
  if (!postalCode && !coords) throw "Need at least postal code or coordinates!";

  const effect = (carpark, setRemInfo, setDetailedInfo, setWarningMessage, _) => {
    setRemInfo([{
      value: <ActivityIndicator />,
      subText: ''
    }]);
    setDetailedInfo(<ActivityIndicator />);

    getCPVacant(carpark.id)
      .then(({ data }) => {
        let vacantCount = 0;
        const lvlInfo = Object.entries(data.status)
          .map(([lvlId, val], i) => {
            vacantCount += val.vacant;
            return [ lvlId, val.vacant ];
          });
        
        if (carpark.renovation) setWarningMessage('may have renovation works.');
        setRemInfo([{
          value: vacantCount,
          subText: 'lots'
        }]);
        setDetailedInfo(lvlInfo);

      })
      .catch((_) => {
        setWarningMessage('unable to determine vacant lots.');
        setRemInfo([
          { value: 'N/A', subText: 'lots' }
        ]);
        setDetailedInfo();
      });
  };

  return <HeaderLayout
    backFn={() => navigation.pop()}
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
