import { Component } from "react";
import { Animated } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default class PanWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xy: new Animated.ValueXY(),
            scale: new Animated.Value(1)
        }

        this.baseXY = props.translation || { x: 0, y: 0 };

        this.pan = Gesture.Pan();
        this.pan.onChange((e) => {
            const scale = this.state.scale.__getValue();
            const { x, y } = this.baseXY;
            this.state.xy.setValue({ x: x + e.translationX / scale, y: y + e.translationY / scale });
        });
        this.pan.onEnd((e) => { 
            const scale = this.state.scale.__getValue();
            const { x, y } = this.baseXY;
            this.baseXY = { x: x + e.translationX / scale, y: y + e.translationY / scale };
            this.state.xy.setValue(this.baseXY);
        });

        this.pinch = Gesture.Pinch();
        this.pinch.onChange((e) => {
            this.state.scale.setOffset(e.scale - 1);
        });
        this.pinch.onEnd((e) => {
            this.state.scale.flattenOffset();
        });
    }

    componentDidUpdate() {
        if (!this.props.translation) return;
        
        this.baseXY = this.props.translation;

        const timing = 500; //500ms
        Animated.timing(this.state.xy, { useNativeDriver: false, timing: timing, toValue: this.baseXY}).start();
        Animated.timing(this.state.scale, { useNativeDriver: false, timing: timing, toValue: 1 }).start();
    }

    render() {
        return <GestureDetector gesture={Gesture.Simultaneous(this.pan, this.pinch)}>
            <Animated.View
                style={{
                    transform: [
                        {scale: this.state.scale },
                        ...this.state.xy.getTranslateTransform()
                    ]
                }}
            >
                {this.props.children}
            </Animated.View>
        </GestureDetector>;
    }
}