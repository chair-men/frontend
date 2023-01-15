import { Component } from "react";
import { Animated, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default class PanWindow extends Component {
    constructor(props) {
        super(props);
        this.child = props.children;
        
        this.state = {
            xy: new Animated.ValueXY(),
            scale: new Animated.Value(1)
        }

        this.pan = Gesture.Pan();
        this.pan.onUpdate((e) => {
            const scale = this.state.scale.__getValue();
            this.state.xy.setValue({ x: e.translationX / scale, y: e.translationY / scale });
        });
        this.pan.onEnd((e) => {
            this.state.xy.extractOffset();
        });

        this.pinch = Gesture.Pinch();
        this.pinch.onChange((e) => {
            this.state.scale.setOffset(e.scale - 1);
        });
        this.pinch.onEnd((e) => {
            this.state.scale.flattenOffset();
        });
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
                {this.child}
            </Animated.View>
        </GestureDetector>;
    }
}