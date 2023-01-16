import { View } from "react-native";

const SpacedRow = ({ spacing, height, alignItems, children }) => {
    alignItems = alignItems || 'center';
    spacing = spacing || 10;

    return <View
        style={{
            display: 'flex',
            flexDirection: 'row',
            height: height,
            alignItems: alignItems
        }}
    >
        {(children && children.length > 1)
            ? children.map((child, i) => <View
            key={i}
                style={{
                    marginLeft: (i > 0) ? spacing : 0
                }}
            >
                {child}
            </View>)
            : children
        }
    </View>;
}

export default SpacedRow;