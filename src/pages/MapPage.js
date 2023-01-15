import { useState } from "react";
import { Image, View } from "react-native";
import CColors from "../constants/CColors";
import PanWindow from "../widgets/PanWindow";

const LevelDisplay = ({ level }) => {
    return <View>
        <Image 
            source={level.imageURL}
            alt={`Level {level.id}`}
        />
        {level.lots.map((lot, i) => {
            const [ tl, br ] = lot.coordinates;
            const [ tx, ty ] = tl;
            const [ bx, by ] = br;

            const content = <View 
                style={{
                    width: bx - tx,
                    height: by - ty,
                    backgroundColor: lot.isOccupied ? CColors.carpark.available : CColors.carpark.taken
                }}
            />;
            return <View
                style={{
                    position: 'absolute',
                    top: ty,
                    left: tx
                }}
            >
                {content}
            </View>;
        })}
    </View>
};

const MapPage = ({ navigation, route }) => {
    const { carpark, startLot } = route.params;
    let startLevel = route.params.startLevel;
    
    if (!startLevel) {
        if (startLot) {
            startLevel = carpark.levels.find((lvl) => lvl.id === startLot.levelId);
        }
        else {
            startLevel = carpark.levels[0];
        }
    }

    const [ level, setLevel ] = useState(startLevel);
    
    return <PanWindow>
        <LevelDisplay level={level} />
    </PanWindow>;
};

export default MapPage;