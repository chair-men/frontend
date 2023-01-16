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
import { coordsFromPostal } from "../../api";
import TextButton from "../../widgets/TextButton";

const ResultPage = ({ route, navigation }) => {
  const [postalCode, onChangePostalCode] = useState("");
  const [ userCoords, setUserCoords ] = useState();
  const [ searching, setSearching ] = useState(true);
  const [ carparks, setCarparks ] = useState([]);

  useEffect(() => {
    getLocation().then((loc) => {
      const { latitude, longitude } = loc.coords;
      setUserCoords({ lat: latitude, lng: longitude });
      setSearching(false);
    }).catch((_) => {
        setSearching(false);
    });
  }, []);

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
  }, [ postalCode ]);

  const body = (carparks.length < 1) 
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
