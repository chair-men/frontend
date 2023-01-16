import { View } from "react-native";
import ClickableIcon from "./ClickableIcon";
import Header from "./Header";

const HeaderLayout = ({ headerComponent, children, backFn }) => {
    return <View
        style={{
            display: 'flex',
            width: '100%',
            height: '100%'
        }}
    >
        <Header>
            {headerComponent}
            {backFn && 
                <View
                    style={{
                        position:'absolute',
                        right: 5,
                        top: 5,

                    }}
                >
                    <ClickableIcon
                        iconName='window-close'
                        onPress={() => backFn()}
                    />
                </View>
            }
        </Header>
        <View
            style={{
                display: 'flex',
                flex: 1
            }}
        >
            {children}
        </View>
    </View>;
};

export default HeaderLayout;