import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { calcDistance } from "../../utils/location";
import { coordsFromPostal, searchCPCoords, searchCPPostal } from "../api";
import Carpark from "../dataclasses/Carpark";
import Button from "./Button";
import CarparkDisplay from "./CarparkDisplay";
import CText from "./CText";
import SpacedColumn from "./SpacedColumn";
import TextButton from "./TextButton";

const CPResult = ({ navigation, carpark, userCoords, effect }) => {
    const [ remInfo, setRemInfo ] = useState([]);
    const [ detailedInfo, setDetailedInfo ] = useState([]);
    if (effect) useEffect(() => {
        effect(carpark, setRemInfo, setDetailedInfo);
    }, [ carpark ]);

    const distance = calcDistance(userCoords.lat, userCoords.lng, carpark.coordinates.lat, carpark.coordinates.lng).toFixed(2);

    return <CarparkDisplay
        navigation={navigation}
        name={carpark.name}
        carpark={carpark}
        warningMessage={carpark?.warningMessage}
        info={[
        { value: distance, subText: "km away" },
        {
            value: (
            <Button
                onPress={() => {
                navigation.navigate("LocationViewer", {
                    marker: {
                    name: carpark.name,
                    coordinates: carpark.coordinates,
                    id: carpark.id,
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
        ...remInfo
        ]}
        detailedInfo={detailedInfo}
    />
};

const SearchResults = ({ navigation, postalCode, coords, effect }) => {
    const [ searching, setSearching ] = useState(true);
    const [ userCoords, setUserCoords ] = useState(coords);
    const [ errorMsg, setErrorMsg ] = useState();
    const [ carparks, setCarparks ] = useState([]);

    useEffect(() => {
        const onSuccess = ({ data: newCPs }) => {
            setCarparks(newCPs.map((cp, _) => Carpark.fromJSON(cp)));
            setSearching(false);
        };

        const onFailure = (msg) => {
            setErrorMsg(msg);
            setSearching(false);
        };

        if (coords === undefined) {
            coordsFromPostal(postalCode)
                .then((coords) => {
                    setUserCoords(coords);

                    searchCPPostal(postalCode)
                        .then(onSuccess)
                        .catch((e) => onFailure('Cannot find any carparks. Please try again later.'));
                })
                .catch((e) => onFailure('Postal code failed. Please try again later.'));
        } else {
            searchCPCoords(coords)
                .then(onSuccess)
                .catch((e) => onFailure('Cannot find any carparks. Please try again later.'));
        }

    }, [ postalCode, coords ]);

    if (carparks.length < 1) return <View
        style={{
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
            <CText>{errorMsg ? errorMsg : 'There are currently no carparks.'}</CText>
            <TextButton
                label='Go Back'
                onPress={() => navigation.pop()} 
            />
            </SpacedColumn>
        }
    </View>;

    return <SpacedColumn alignItems="stretch" width="100%" spacing={20}>
        {carparks.map((cp, _) => {
            return <CPResult 
                navigation={navigation}
                key={cp.id}
                carpark={cp}
                userCoords={userCoords}
                effect={effect}
            />;
        })}    
    </SpacedColumn>;
};

export default SearchResults;