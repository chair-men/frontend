import { useState } from "react";
import { LayoutAnimation, TouchableOpacity, View } from "react-native"

const Accordion = ({ topComponent, spacing, children }) => {
    const [ isExpanded, setIsExpanded ] = useState(false);
    const toggleExpanded = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    }

    spacing = spacing || 0;

    return <View>
        <TouchableOpacity
            onPress={toggleExpanded}
            style={{ marginBottom: isExpanded ? spacing : 0 }}
        >
            {topComponent}
        </TouchableOpacity>
        {isExpanded && children}
    </View>;
}

export default Accordion;