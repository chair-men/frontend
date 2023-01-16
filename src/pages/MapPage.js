import { Component, useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import CColors from "../constants/CColors";
import PanWindow from "../widgets/PanWindow";
import SpacedColumn from "../widgets/SpacedColumn";

class LevelDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level: props.level,
            width: undefined,
            height: undefined
        };
    }

    onLevelImage(url) {
        Image.getSize(url, (w, h) => {
            setWidth(w);
            setHeight(h);
    
            const imgCenter = { x: w/2, y: h/2 };
            this.props.setCenter(imgCenter);
        });
    }

    componentDidMount() {
        this.onLevelImage(this.props.level.imageURL);
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps, this.props);
        this.onLevelImage(this.props.level.imageURL);
        this.setState({ level: this.props.level });
    }

    render() {
        const level = this.state.level;
        if (!this.state.width || !this.state.height) {
            return <Text>Loading</Text>;
        }
    
        return <View
            style={{
                width: this.state.width,
                height: this.state.height
            }}
        >
            <Image 
                style={{ flex: 1, resizeMode: 'contain' }}
                source={{ uri: level.imageURL }}
                alt={`Level {level.id}`}
            />
            {/*level.lots.map((lot, i) => {
                console.log(lot.coordinates);
                const [ tl, br ] = lot.coordinates;
                const [ tx, ty ] = tl;
                const [ bx, by ] = br;
    
                const content = <View 
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: lot.isOccupied ? 'green' : 'red'
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
            })*/}
        </View>;
    }
}

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

    console.log(level.id);
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