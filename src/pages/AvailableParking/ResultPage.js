import { View } from "react-native";
import SpacedColumn from "../../widgets/SpacedColumn";
import CText from "../../widgets/CText";
import Header from "../../widgets/Header";
import CarparkDisplay from "../../widgets/CarparkDisplay";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Button from "../../widgets/Button";
import { testCP } from "../../testdata/test";
import { useEffect, useState } from "react";

const ResultPage = ({ navigation, route }) => {
  const { postalCode } = route.params;
  const [ availableLots, setAvailableLots ] = useState({});
  const carparks = [testCP];

  const zip = (a, b) => a.map((k, i) => [k, b[i]]);

  useEffect(() => {
    carparks.forEach((cp) => {
      var t = {};
      cp.levels.forEach((lvl) => {
        t[lvl.id] = lvl.lots.reduce(
          (accumulator, lot) => accumulator + (lot.is_occupied ? 0 : 1),
          0
        );
      });
      setAvailableLots({ ...availableLots, [cp.id]: t });
    });
    // console.log(availableLots);
  }, []);

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
          return (
            <CarparkDisplay
              key={i}
              navigation={navigation}
              nav={"MapPage"}
              name={cp.name}
              carpark={cp}
              warningMessage={cp?.warningMessage}
              info={[
                { value: 0.5, subText: "km away" },
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
                            coordinates: cp.coordinates.split(", "),
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
