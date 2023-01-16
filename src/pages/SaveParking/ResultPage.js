import { ActivityIndicator, View } from "react-native";
import SpacedColumn from "../../widgets/SpacedColumn";
import CText from "../../widgets/CText";
import TextButton from "../../widgets/TextButton";
import Header from "../../widgets/Header";
import CarparkDisplay from "../../widgets/CarparkDisplay";
import Button from "../../widgets/Button";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { getCPOccupied } from "../../api";
import { calcDistance } from "../../../utils/location";
import HeaderLayout from "../../widgets/HeaderLayout";
import SearchResults from "../../widgets/SearchResults";

const ResultPage = ({ navigation, route }) => {
  const { licencePlate, postalCode, coords } = route.params;
  const [ carparks, setCarparks ] = useState([]);

  const effect = (carpark, _, setDetailedInfo, setWarningMessage) => {
    setDetailedInfo(<ActivityIndicator />);

    getCPOccupied(carpark.id)
      .then(({ data }) => {
        const lvlInfo = [];
        if (data.status) Object.entries(data.status)
          .forEach(([lvlId, val], i) => {
            if (val.occupied > 0) lvlInfo.push([ lvlId ]);
          });
        
        if (lvlInfo.length > 0) {
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

  if (carparks.length < 1) return <View
    style={{
      flex: 1,
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
          <CText>We couldn't find any carparks for you.</CText>
          <TextButton
            label='Go Back'
            onPress={() => navigation.pop()} 
          />
        </SpacedColumn>
    }
  </View>;

  return (
    <View>
      <Header>
        <CText>Select your carpark and level</CText>
      </Header>
      <SpacedColumn alignItems="stretch" width="100%" spacing={20}>
        {carparks.map((cp) => {
          const distance = calcDistance(userCoords.lat, userCoords.lng, cp.coordinates.lat, cp.coordinates.lng).toFixed(2);

          return (
            <CarparkDisplay
              navigation={navigation}
              nav={"MapPage"}
              name={cp.name}
              carpark={cp}
              warningMessage={cp?.warningMessage}
              info={[
                { value: distance, subText: "km away" },
                {
                  value: (
                    <Button
                      onPress={() => {
                        navigation.navigate("LocationViewer", {
                          marker: {
                            name: cp.name,
                            coordinates: cp.coordinates,
                            id: cp.id,
                          },
                        });
                      }}
                      styles={{ backgroundColor: CColors.backdrop }}
                    >
                      <FontAwesome5 name={"map"} size={22} />
                    </Button>
                  ),
                  subText: "Map",
                },
              ]}
              detailedInfo={
                cp.levels.map(lvl => lvl.id)
              }
            />
          );
        })}
      </SpacedColumn>
    </View>
  );
};

export default ResultPage;
