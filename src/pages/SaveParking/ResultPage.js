import { View } from "react-native";
import SpacedColumn from "../../widgets/SpacedColumn";
import CText from "../../widgets/CText";
import Header from "../../widgets/Header";
import CarparkDisplay from "../../widgets/CarparkDisplay";
import { testCP } from "../../testdata/test";
import Button from "../../widgets/Button";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const ResultPage = ({ navigation, route }) => {
  const { licencePlate, postalCode } = route.params;
  const carparks = [testCP];

  return (
    <View>
      <Header>
        <CText>Select your carpark and level</CText>
      </Header>
      <SpacedColumn alignItems="stretch" width="100%" spacing={20}>
        {carparks.map((cp) => {
          return (
            <CarparkDisplay
              navigation={navigation}
              nav={"MapPage"}
              name={cp.name}
              carpark={cp}
              warningMessage={cp?.warningMessage}
              info={[
                { value: 0.5, subText: "km away" },
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
