import { ActivityIndicator, View } from "react-native";
import SpacedColumn from "../../widgets/SpacedColumn";
import CText from "../../widgets/CText";
import TextButton from "../../widgets/TextButton";
import Header from "../../widgets/Header";
import CarparkDisplay from "../../widgets/CarparkDisplay";
import { testCP } from "../../testdata/test";
import Button from "../../widgets/Button";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect, useState } from "react";
import { coordsFromPostal, searchCPPostal, searchCPCoords } from "../../api";
import { calcDistance } from "../../../utils/location";

const ResultPage = ({ navigation, route }) => {
  const { licencePlate, postalCode, coords } = route.params;
  const [ userCoords, setUserCoords ] = useState(coords);
  const [ carparks, setCarparks ] = useState([]);
  const [ searching, setSearching ] = useState(true);

  useEffect(() => {
    const onSuccess = (newCP) => {
      setSearching(false);
      setCarparks(newCP);
    };

    const onFailure = (e) => {
      console.log(e);
      setSearching(false);
      setCarparks([]);
    };

    if (postalCode !== undefined) {
      coordsFromPostal(postalCode)
        .then((coords) => {
          setUserCoords(coords);

          searchCPPostal(postalCode)
            .then(onSuccess)
            .catch(onFailure);
        })
        .catch(onFailure);
    }
    else if (coords !== undefined) searchCPCoords(coords)
      .then(onSuccess)
      .catch(onFailure);
  }, []);

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
