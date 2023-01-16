import { useEffect, useState } from "react";
import { Dimensions, Image, PixelRatio, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import CColors from "../constants/CColors";
import PanWindow from "../widgets/PanWindow";
import SpacedColumn from "../widgets/SpacedColumn";

const LevelDisplay = ({ level, setCenter }) => {
    const [ width, setWidth ] = useState();
    const [ height, setHeight ] = useState();

    useEffect(() => {
        Image.getSize(level.imageURL, (width, height) => {
            setWidth(width);
            setHeight(height);
            setCenter({ x: width / 2, y: height / 2 });
        }, console.log);

    }, [ level.imageURL ]);

    if (!width || !height) {
        return <Text>Loading</Text>;
    }

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

            const content = <View 
                style={{
                    width: bx - tx,
                    height: by - ty,
                    backgroundColor: lot.isOccupied ? CColors.carpark.taken : CColors.carpark.available
                }}
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
    const { carpark, startLot } = route.params;
    let startLevel = route.params.startLevel;
    
    if (startLevel === undefined) {
        if (startLot) {
            startLevel = carpark.levels.find((lvl) => lvl.id === startLot.levelId);
        }
        else {
            startLevel = carpark.levels[0];
        }
    }

    const [ level, setLevel ] = useState(startLevel);
    const [ translation, setTranslation ] = useState();
    const [ mapCenter, setMapCenter ] = useState();

    const setLocalCenter = (center) => {
        const { width, height } = Dimensions.get('window');
        const { x, y } = center;
        setTranslation({ x: width / 2 - x, y: height/2 - y }); 
    };

    return <View className="flex-1">
        <PanWindow
            translation={translation}
        >
            <LevelDisplay 
                key={level.id}
                level={level}
                setCenter={(center) => {
                    setMapCenter(center);
                    setLocalCenter(center);
                }}
            />
        </PanWindow>
        <View
            style={{
                position: 'absolute',
                bottom: 25,
                right: 25
            }}
        >
            <SpacedColumn
                spacing={0}
            >
                {carpark.levels.slice(0).reverse().map((lvl, _) => <TouchableWithoutFeedback
                    onPress={() => setLevel({...lvl})}
                    key={lvl.id}
                    style={{
                        backgroundColor: lvl.id === level.id ? 'green' : 'red',
                        width: 75,
                        height: 75,
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text>{lvl.id}</Text>
                </TouchableWithoutFeedback>)}
            </SpacedColumn>
        </View>
    </View>;
};

export default MapPage;