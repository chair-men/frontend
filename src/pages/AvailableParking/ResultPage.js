import { ActivityIndicator, View } from "react-native";
import CText from "../../widgets/CText";
import Header from "../../widgets/Header";
import { getCPVacant } from "../../api";
import SearchResults from "../../widgets/SearchResults";

const ResultPage = ({ navigation, route }) => {
  const { postalCode, coords } = route.params;
  if (!postalCode && !coords) throw "Need at least postal code or coordinates!";

  const effect = (carpark, setRemInfo, setDetailedInfo) => {
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
        
        setRemInfo([{
          value: vacantCount,
          subText: 'lots'
        }]);
        console.log(lvlInfo);
        setDetailedInfo(lvlInfo);

      })
      .catch((_) => {
        setRemInfo([
          { value: 'N/A', subText: 'lots' }
        ]);
        setDetailedInfo();
      });
  };

  return (
    <View>
      <Header>
        <CText>
          Showing results for{" "}
          <CText styles={{ fontWeight: "bold" }}>{postalCode}</CText>
        </CText>
      </Header>
      <SearchResults 
        navigation={navigation}
        postalCode={postalCode}
        coords={coords}
        effect={effect}
      />
    </View>
  );
};

export default ResultPage;
