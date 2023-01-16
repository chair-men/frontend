import { View } from "react-native";

import CColors from "../constants/CColors";
import Accordion from "../widgets/Accordion";
import SpacedColumn from "../widgets/SpacedColumn";
import TextButton from "../widgets/TextButton";
import IconButton from "../widgets/IconButton";
import { testCP } from "../testdata/test";

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
                    navigation.navigate('AvailableParkingMainPage')
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
                            navigation.navigate('SaveParkingMainPage')
                        }}
                    />
                    <TextButton 
                        label='Find My Car'
                        onPress={() => {
                            navigation.navigate('FindingCarMainPage')
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
            <TextButton
                label='Map'
                onPress={() => navigation.navigate('MapPage', { carpark: testCP })}
            />
        </SpacedColumn>
    </View>
};

export default EntryPage;