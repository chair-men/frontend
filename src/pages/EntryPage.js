import { View, Image, Dimensions } from "react-native";

import CColors from "../constants/CColors";
import Accordion from "../widgets/Accordion";
import SpacedColumn from "../widgets/SpacedColumn";
import TextButton from "../widgets/TextButton";
import IconButton from "../widgets/IconButton";
import { testCP } from "../testdata/test";

import { HDB_LOGO } from "../images";
import CText from "../widgets/CText";
import Title from "../widgets/Title";

const EntryPage = ({ navigation }) => {
  const win = Dimensions.get("window");

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        padding: 50,
        backgroundColor: CColors.backdrop,
      }}
    >
      <Image
        source={HDB_LOGO}
        style={{ alignSelf: "stretch", width: win.width * 0.8 }}
        resizeMode={"contain"}
      />
      <Title>Park Me</Title>
      <SpacedColumn alignItems="stretch" width="100%">
        <IconButton
          label="Available Parking"
          iconName="parking"
          onPress={() => {
            navigation.navigate("AvailableParkingMainPage");
          }}
        />
        <Accordion
          topComponent={<IconButton label="Parking Helper" iconName="car" />}
          spacing={0}
        >
          <SpacedColumn width="100%" alignItems="stretch" spacing={0}>
            <TextButton
              label="Save Parking Location"
              onPress={() => {
                navigation.navigate("SaveParkingMainPage");
              }}
              styles={{
                backgroundColor: CColors.accordion,
                borderBottomWidth: 1,
                borderRadius: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <TextButton
              label="Find My Car"
              onPress={() => {
                navigation.navigate("FindingCarMainPage");
              }}
              styles={{
                backgroundColor: CColors.accordion,
                borderRadius: 0,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            />
          </SpacedColumn>
        </Accordion>
        <IconButton
          label="View Feedback"
          iconName="comment-dots"
          onPress={() => {
            navigation.navigate("GiveFeedbackMainPage");
          }}
        />
        <TextButton label="Map" onPress={() => navigation.navigate("MapPage", { carpark: testCP })} />
      </SpacedColumn>
    </View>
  );
};

export default EntryPage;
