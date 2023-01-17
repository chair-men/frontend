import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { getCP, getCPLevel } from "../api";
import CColors from "../constants/CColors";
import CText from "../widgets/CText";
import PanWindow from "../widgets/PanWindow";
import SpacedColumn from "../widgets/SpacedColumn";
import Level from '../dataclasses/Level';
import Title from "../widgets/Title";
import ClickableIcon from "../widgets/ClickableIcon";

const LevelDisplay = ({ navigation, carparkId, levelId, setCenter, onLoad, startLotId, licensePlate }) => {
    const [ width, setWidth ] = useState(1000);
    const [ height, setHeight ] = useState(1000);
    const [ level, setLevel ] = useState();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);
        setLevel();
        setCenter({ x: width / 2, y: height / 2 });

        getCPLevel(carparkId, levelId)
            .then(({ data }) => {
                Image.getSize(data.image_url, (width, height) => {
                    setWidth(width);
                    setHeight(height);
                setCenter({ x: width / 2, y: height / 2 });
                }, console.log);
                const lvl = Level.fromJSON(data);
                setLevel(lvl);
                setLoading(false);
                onLoad();

                if (startLotId) navigation.navigate("LotModal", { lot: lvl.lots.find(lot => lot.id === startLotId)});
            })
            .catch((_) => {
                setLevel();
                setLoading(false);
            });
    }, [ levelId ]);

    if (!level) return <View
        style={{
            display: 'flex',
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: CColors.backdrop,
            flexGrow: 1
        }}
    >
        {
            loading
            ? <SpacedColumn>
                <ActivityIndicator size='large' />
                <CText>Loading level...</CText>
            </SpacedColumn>
            : <CText>Unable to load level.</CText>
        }
    </View>

    return <View
        style={{
            width: width,
            height: height
        }}
    >
        <Image 
            style={{ flex: 1, resizeMode: 'contain' }}
            source={{ uri: level.imageURL }}
        />
        {level.lots.map((lot, i) => {
            const [ tl, br ] = lot.coordinates;
            const [ tx, ty ] = tl;
            const [ bx, by ] = br;

            const content = <TouchableWithoutFeedback 
                style={{
                    width: bx - tx,
                    height: by - ty,
                    backgroundColor: lot.vacant 
                        ? CColors.carpark.available 
                        : lot.id === startLotId
                        ? CColors.carpark.highlight
                        : CColors.carpark.taken
                }}
                onPress={() => navigation.navigate('LotModal', { lot: lot, licensePlate: licensePlate })}
            />;
            return <View
                key={lot.id}
                style={{
                    position: 'absolute',
                    top: ty,
                    left: tx
                }}
            >
                {content}
            </View>;
        })}
    </View>;
};

const MapPage = ({ navigation, route }) => {
    const { carpark, startLot, licensePlate } = route.params;
    let startLevelId = route.params.startLevelId;

    const [ loading, setLoading ] = useState(true);
    const [ allLevelIds, setAllLevelIds ] = useState([]);
    const [ levelId, setLevelId ] = useState();
    const [ initialCoords, setInitialCoords ] = useState();

    useEffect(() => {
        getCP(carpark.id)
            .then(({ data }) => {
                const allLvls = Object.keys(data.status);

                if (startLot) {
                    startLevelId = allLvls.find((lvlId) => lvlId === startLot.level);
                    const { brx, bry, tlx, tly } = startLot;
                    setInitialCoords({ x: (tlx + brx) / 2, y: (tly + bry) / 2});
                    // startCoords = carpark.levels[startLevelId][startLot]
                }
                if (startLevelId === undefined) {
                    startLevelId = allLvls[0];
                }
                
                setLevelId(startLevelId);
                setAllLevelIds(allLvls);
                setLoading(false);
            })
            .catch((_) => {
                setAllLevelIds([]);
                setLoading(false);
            });
    }, [ carpark ]);

    const [ translation, setTranslation ] = useState();
    const [ mapCenter, setMapCenter ] = useState();

    const setLocalCenter = (center, scale) => {
        const { width, height } = Dimensions.get('window');
        const { x, y } = center;
        setTranslation({ x: width / 2 - x, y: height/2 - y }); 
    };

    if (allLevelIds.length < 1) return <View 
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        {(loading) 
            ? <SpacedColumn>
                <ActivityIndicator size='large' />
                <CText>Loading carpark...</CText>
            </SpacedColumn>
            : <CText>No levels to display.</CText>
        }
    </View>;

    return <View className="flex-1"
        style={{ backgroundColor: CColors.backdrop }}
    >
        <PanWindow
            translation={translation}
        >
            <LevelDisplay
                navigation={navigation}
                licensePlate={licensePlate}
                carparkId={carpark.id}
                levelId={levelId}
                setCenter={(center) => {
                    setMapCenter(center);
                    setLocalCenter(center);
                }}
                onLoad={() => { if (initialCoords) setLocalCenter(initialCoords); }}
                startLotId={startLot ? startLot.id : undefined}
            />
        </PanWindow>
        <View
            style={{
                position: 'absolute',
                bottom: 25,
                right: 25,
                borderWidth: 2
            }}
        >
            <SpacedColumn
                spacing={0}
            >
                {allLevelIds.slice(0).reverse().map((lvlId, _) => <TouchableWithoutFeedback
                    onPress={() => setLevelId(lvlId)}
                    key={lvlId}
                    style={{
                        backgroundColor: lvlId === levelId ? CColors.button : CColors.backdrop,
                        width: 75,
                        height: 75,
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text>{lvlId}</Text>
                </TouchableWithoutFeedback>)}
            </SpacedColumn>
        </View>
        <View
            style={{ 
                position: 'absolute',
                top: 25,
                marginHorizontal: 'auto',
                left: 0,
                right: 0,
            }}
        >
            <Title>Select a lot</Title>
        </View>
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
    </View>;
};

export default MapPage;