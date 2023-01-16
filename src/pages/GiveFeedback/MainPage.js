import { ActivityIndicator, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import SpacedColumn from "../../widgets/SpacedColumn";
import Header from "../../widgets/Header";
import CarparkDisplay from "../../widgets/CarparkDisplay";
import InputBox from "../../widgets/InputBox";
import { useEffect, useState } from "react";
import CColors from "../../constants/CColors";
import Button from "../../widgets/Button";
import { calcDistance, getLocation } from "../../../utils/location";
import CText from "../../widgets/CText";
import { coordsFromPostal, searchCPCoords } from "../../api";
import TextButton from "../../widgets/TextButton";

const ResultPage = ({ route, navigation }) => {
  const [postalCode, onChangePostalCode] = useState("");
  const [userCoords, setUserCoords] = useState();
  const [searching, setSearching] = useState(true);
  const [carparks, setCarparks] = useState([]);

  useEffect(() => {
    getLocation().then((loc) => {
      const { latitude, longitude } = loc.coords;
      setUserCoords(`${latitude},${longitude}`);
      setSearching(false);
    }).catch((_) => {
      setSearching(false);
    });
  }, []);

  useEffect(() => {
    const onSuccess = ({ data }) => {
      setCarparks(data);
      setSearching(false);
    };

    const onFailure = (e) => {
      console.log(e);
      setCarparks([]);
      setSearching(false);
    };

    if (userCoords) {
      searchCPCoords(userCoords)
        .then(onSuccess)
        .catch(onFailure);
    }

  }, [userCoords]);

  const body = (carparks.length === 0)
    ? <View
      style={{
        width: '100%',
        height: '90%',
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
            <CText>{!userCoords
              ? "Please search for a carpark."
              : "We couldn't find any carparks for you."
            }</CText>
          </SpacedColumn>
      }
    </View>

    : <SpacedColumn alignItems="stretch" width="100%" spacing={20}>
      {carparks.map((cp) => {
        const [lat, lng] = userCoords.split(',')
        console.log(userCoords)
        const distance = calcDistance(parseFloat(lat), parseFloat(lng), parseFloat(cp.coordinates.lat), parseFloat(cp.coordinates.lng)).toFixed(2);

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
              ['1A', '2A', '1B', '2B']
            }
          />
        );
      })}
    </SpacedColumn>;

  return (
    <View>
      <Header>
        <FontAwesome5 name={"search"} size={18} />
        <InputBox
          value={postalCode}
          onChange={onChangePostalCode}
          placeholder={"Find other carparks"}
          styles={{
            width: "90%",
            textAlign: "left",
            backgroundColor: CColors.header,
          }}
          keyboardType="numeric"
          maxLength={6}
        />
      </Header>
      {body}
    </View>
  );
};

export default ResultPage;
