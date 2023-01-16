import { ActivityIndicator, View } from "react-native";
import SpacedColumn from "../../widgets/SpacedColumn";
import CText from "../../widgets/CText";
import Header from "../../widgets/Header";
import CarparkDisplay from "../../widgets/CarparkDisplay";
import CColors from "../../constants/CColors";
import TextButton from "../../widgets/TextButton";
import { useEffect, useState } from "react";
import { getCP, searchCPLot } from "../../api";

const ResultPage = ({ route, navigation }) => {
  const { licensePlate } = route.params;
  const [searching, setSearching] = useState(true);
  const [errorMsg, setErrorMsg] = useState();
  const [parkingLot, setParkingLot] = useState({});
  const [carpark, setCarpark] = useState({});

  useEffect(() => {
    searchCPLot(licensePlate)
      .then(({ data }) => {
        setParkingLot(data);
        console.log(data)
        getCP(data.ppcode)
          .then(({ data }) => { console.log(data); setCarpark(data) })
          .catch((e) => console.log(e))
        setSearching(false);
      })
      .catch(() => {
        setErrorMsg('Error');
        setSearching(false);
      })
  }, [])

  if (parkingLot.length === 0) return <View
    style={{
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: CColors.backdrop
    }}
  >
    {
      searching
        ? <SpacedColumn>
          <ActivityIndicator size='large' />
          <CText>Searching for nearby carparks...</CText>
        </SpacedColumn>
        : <SpacedColumn
          alignItems='stretch'
        >
          <CText>{errorMsg ? errorMsg : `Invalid License Plate!`}</CText>
          <TextButton label={'Go back'} onPress={() => navigation.pop()} />
        </SpacedColumn>
    }
  </View>

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: CColors.backdrop,
        height: "100%",
      }}
    >
      <SpacedColumn alignItems="stretch" spacing={20}>
        <CText>Your car is at:</CText>
        <CText styles={{ fontWeight: "bold", fontSize: 28, width: "80%", alignSelf: 'center' }}>
          {`${parkingLot?.ppname}\nLevel ${parkingLot?.level} Lot ${parkingLot?.lotnumber}`}
        </CText>
        <TextButton
          label="View on Map"
          onPress={() => {
            navigation.navigate("MapPage", { carpark: carpark, startLot: parkingLot });
          }}
          styles={{ width: "80%", alignSelf: 'center' }}
        />
      </SpacedColumn>
    </View>
  );
};

export default ResultPage;
