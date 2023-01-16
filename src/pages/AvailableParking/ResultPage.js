import { ActivityIndicator, View } from "react-native";
import SpacedColumn from "../../widgets/SpacedColumn";
import CText from "../../widgets/CText";
import Header from "../../widgets/Header";
import CarparkDisplay from "../../widgets/CarparkDisplay";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Button from "../../widgets/Button";
import { testCP } from "../../testdata/test";
import { useEffect, useState } from "react";
import TextButton from "../../widgets/TextButton";
import CColors from "../../constants/CColors";
import { searchCPCoords, searchCPPostal } from "../../api";
import { calcDistance } from "../../../utils/location";

const ResultPage = ({ navigation, route }) => {
  const { postalCode, coords } = route.params;
  if (!postalCode && !coords) throw "Need at least postal code or coordinates!";

  const [ searching, setSearching ] = useState(true);
  const [ availableLots, setAvailableLots ] = useState({});
  const [ carparks, setCarparks ] = useState([]);

  const zip = (a, b) => a.map((k, i) => [k, b[i]]);

  useEffect(() => {
    const onSuccess = (newCP) => {
      newCP.forEach((cp) => {
        var t = {};
        cp.levels.forEach((lvl) => {
          t[lvl.id] = lvl.lots.reduce(
            (accumulator, lot) => accumulator + (lot.is_occupied ? 0 : 1),
            0
          );
        });
        setAvailableLots({ ...availableLots, [cp.id]: t });
      });

      setSearching(false);
      setCarparks(newCP);
    };

    const onFailure = (e) => {
      console.log(e);
      setSearching(false);
      setCarparks([]);
    };

    if (postalCode !== undefined) searchCPPostal(postalCode)
      .then(onSuccess)
      .catch(onFailure);
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
        <CText>
          Showing results for{" "}
          <CText styles={{ fontWeight: "bold" }}>{postalCode}</CText>
        </CText>
      </Header>
      <SpacedColumn alignItems="stretch" width="100%" spacing={20}>
        {carparks.map((cp, i) => {
          const distance = calcDistance(userCoords.lat, userCoords.lng, cp.coordinates.lat, cp.coordinates.lng).toFixed(2);

          return (
            <CarparkDisplay
              key={i}
              navigation={navigation}
              nav={"MapPage"}
              name={cp.name}
              carpark={cp}
              warningMessage={cp?.warningMessage}
              info={[
                { value: distance, subText: "km away" },
                {
                  value: availableLots?.[cp.id]
                    ? Object.values(availableLots[cp.id]).reduce(
                        (a, b) => a + b,
                        0
                      )
                    : 0,
                  subText: "lots",
                },
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
                availableLots?.[cp.id]
                  ? zip(
                      Object.keys(availableLots?.[cp.id]),
                      Object.values(availableLots?.[cp.id])
                    )
                  : null
              }
            />
          );
        })}
      </SpacedColumn>
    </View>
  );
};

export default ResultPage;
