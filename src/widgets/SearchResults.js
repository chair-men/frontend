import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { calcDistance } from "../../utils/location";
import { coordsFromPostal, searchCPCoords, searchCPPostal } from "../api";
import Carpark from "../dataclasses/Carpark";
import CarparkDisplay from "./CarparkDisplay";
import ClickableIcon from "./ClickableIcon";
import CText from "./CText";
import SpacedColumn from "./SpacedColumn";

const CPResult = ({ navigation, carpark, distance, effect }) => {
    const [ remInfo, setRemInfo ] = useState([]);
    const [ detailedInfo, setDetailedInfo ] = useState([]);
    const [ warningMessage, setWarningMessage ] = useState();
    const [ licensePlate, setLicensePlate ] = useState();

    if (effect) useEffect(() => {
        effect( carpark, setRemInfo, setDetailedInfo, setWarningMessage, setLicensePlate );
    }, [ carpark ]);
    
    return <CarparkDisplay
        navigation={navigation}
        name={carpark.name}
        carpark={carpark}
        warningMessage={warningMessage}
        licensePlate={licensePlate}
        info={[
        { value: distance.toFixed(2), subText: "km away" },
        ...remInfo,
        {
            value: (<ClickableIcon 
                iconName='map'
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
            />),
            subText: "Map",
        }
        ]}
        detailedInfo={detailedInfo}
    />
};

const SearchResults = ({ navigation, postalCode, coords, effect }) => {
    const [ searching, setSearching ] = useState(true);
    const [ userCoords, setUserCoords ] = useState(coords);
    const [ errorMsg, setErrorMsg ] = useState();
    const [ carparks, setCarparks ] = useState([]);
    const [ page, setPage ] = useState(1);

    useEffect(() => {
        setSearching(true);
        setCarparks([]);

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
                .then(({ data: coords }) => {
                    const { lat, lng } = coords;
                    if (!lat || !lng) {
                        onFailure('Invalid postal code.');
                        return;
                    }

                    setUserCoords(coords);
                    searchCPPostal(postalCode)
                        .then(onSuccess)
                        .catch((e) => onFailure('Cannot find any carparks.'));
                })
                .catch((e) => onFailure('Invalid postal code.'));
        } else {
            searchCPCoords(coords)
                .then(onSuccess)
                .catch((e) => onFailure('Cannot find any carparks.'));
        }

    }, [ postalCode, coords ]);

    if (carparks.length < 1) return <View
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
            <CText>{errorMsg ? errorMsg : 'There are currently no carparks.'}</CText>
            </SpacedColumn>
        }
    </View>;

    const getDistance = (cpCoords) => {
        return calcDistance(userCoords.lat, userCoords.lng, cpCoords.lat, cpCoords.lng);
    };
    
    carparks.sort((a, b) => getDistance(a.coordinates) - getDistance(b.coordinates));

    return <FlatList
        style={{ display: 'flex', flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        data={carparks.slice(0, Math.min(10 * page, carparks.length))}
        renderItem={({ item: cp }) => {
            return <CPResult 
            navigation={navigation}
            carpark={cp}
            distance={getDistance(cp.coordinates)}
            effect={effect}
        />}}
        keyExtractor={(cp) => cp.id}
        onEndReachedThreshold={0.2}
        onEndReached={() => setPage(page + 1)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
    />;
};

export default SearchResults;