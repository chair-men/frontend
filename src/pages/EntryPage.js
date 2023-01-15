import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CColors from "../constants/CColors";
import Accordion from "../widgets/Accordion";
import SpacedColumn from "../widgets/SpacedColumn";
import TextButton from "../widgets/TextButton";
import IconButton from "../widgets/IconButton";

const EntryPage = ({ navigation }) => {
    return <View
        style={{ 
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 50,
            backgroundColor: CColors.backdrop 
        }}
    >
        <SpacedColumn
            alignItems='stretch'
            width='100%'
        >
            <IconButton 
                label='Available Parking'
                iconName='parking'
                onPress={() => {
                    navigation.navigate('AvailableParkingPage')
                }}
            />
            <Accordion
                topComponent={<IconButton 
                    label='Parking Helper'
                    iconName='car'
                />}
                spacing={10}
            >
                <SpacedColumn
                    width='100%'
                    alignItems='stretch'
                >
                    <TextButton 
                        label='Save Parking Location'
                        onPress={() => {

                        }}
                    />
                    <TextButton 
                        label='Find My Car'
                        onPress={() => {

                        }}
                    />
                </SpacedColumn>
            </Accordion>
            <IconButton 
                label='View Feedback' 
                iconName='comment-dots'
                onPress={() => {

                }}
            />
        </SpacedColumn>
    </View>
};

export default EntryPage;