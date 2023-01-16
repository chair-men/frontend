import { View } from "react-native";
import Header from "./Header";

const HeaderLayout = ({ headerComponent, children }) => {
    return <View
        style={{
            display: 'flex',
            width: '100%',
            height: '100%'
        }}
    >
        <Header>
            {headerComponent}
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