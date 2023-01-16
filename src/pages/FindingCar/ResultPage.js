import { ActivityIndicator, View } from "react-native";
import SpacedColumn from "../../widgets/SpacedColumn";
import CText from "../../widgets/CText";
import Header from "../../widgets/Header";
import CarparkDisplay from "../../widgets/CarparkDisplay";
import CColors from "../../constants/CColors";
import TextButton from "../../widgets/TextButton";
import { useEffect, useState } from "react";
import { getCP, searchCPLot } from "../../api";
import ClickableIcon from "../../widgets/ClickableIcon";

const ResultPage = ({ route, navigation }) => {
  const { licensePlate } = route.params;
  const [searching, setSearching] = useState(true);
  const [errorMsg, setErrorMsg] = useState();
  const [parkingLot, setParkingLot] = useState();
  const [carpark, setCarpark] = useState({});

  useEffect(() => {
    searchCPLot(licensePlate)
      .then(({ data }) => {
        setParkingLot(data);
        getCP(data.ppcode)
          .then(({ data }) => setCarpark(data))
          .catch((e) => console.log(e))
        setSearching(false);
      })
      .catch(() => {
        setErrorMsg('Error');
        setSearching(false);
      })
  }, [])

  if (!parkingLot) return <View
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
          <CText>Searching for '{licensePlate}'...</CText>
        </SpacedColumn>
        : <SpacedColumn
          alignItems='stretch'
        >
          <CText>{errorMsg ? errorMsg : `We couldn't find that license plate.`}</CText>
          <TextButton label={'Go back'} onPress={() => navigation.pop()} />
        </SpacedColumn>
    }
  </View>

  return (
    <View
      style={{
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: CColors.backdrop,
        height: "100%",
        padding: 20
      }}
    >
      <SpacedColumn width='80%' alignItems="stretch" spacing={20}>
        <CText>Your car is at:</CText>
        <CText styles={{ fontWeight: "bold", fontSize: 28, alignSelf: 'center' }}>
          {`${parkingLot?.ppname}\nLevel ${parkingLot?.level} Lot ${parkingLot?.lotnumber}`}
        </CText>
        <TextButton
          label="View on Map"
          onPress={() => {
            navigation.navigate("MapPage", { carpark: carpark, startLot: parkingLot });
          }}
        />
      </SpacedColumn>
      <View
        style={{
          position: 'absolute',
          top: 5,
          right: 5
        }}
      >
        <ClickableIcon
          iconName='window-close'
          onPress={() => navigation.pop()}
        />
      </View>
    </View>
  );
};

export default ResultPage;
