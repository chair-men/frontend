import { View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import SpacedColumn from "../../widgets/SpacedColumn";
import Header from "../../widgets/Header";
import CarparkDisplay from "../../widgets/CarparkDisplay";
import InputBox from "../../widgets/InputBox";
import { useEffect, useState } from "react";
import CColors from "../../constants/CColors";
import IconButton from "../../widgets/IconButton";
import Button from "../../widgets/Button";

const ResultPage = ({ route, navigation }) => {
  const [postalCode, onChangePostalCode] = useState("");

  return (
    <View>
      <Header>
        <FontAwesome5 name={"search"} size={18} />
        <InputBox
          value={postalCode}
          onChange={onChangePostalCode}
          placeholder={"Find other carparks"}
          styles={{
            width: "90%",
            textAlign: "left",
            backgroundColor: CColors.header,
          }}
          keyboardType="numeric"
          maxLength={6}
        />
      </Header>
      <SpacedColumn alignItems="stretch" width="100%" spacing={20}>
        <CarparkDisplay
          name="Blk 427"
          warningMessage="warning"
          info={[
            { value: 0.5, subText: "km away" },
            {
              value: (
                <Button
                  onPress={() => {
                    navigation.navigate("Map");
                  }}
                  styles={{ backgroundColor: CColors.backdrop }}
                >
                  <FontAwesome5 name={"map"} size={22} />
                </Button>
              ),
              subText: "Map",
            },
          ]}
          detailedInfo={["Level 3", "Level 2", "Level 1"]}
          nav={"FeedbackForm"}
          navigation={navigation}
        />
        <CarparkDisplay
          name="Blk 427"
          // warningMessage="warning"
          info={[
            { value: 0.5, subText: "km away" },
            {
              value: (
                <Button
                  onPress={() => {
                    navigation.navigate("LocationViewer");
                  }}
                  styles={{ backgroundColor: CColors.backdrop }}
                >
                  <FontAwesome5 name={"map"} size={22} />
                </Button>
              ),
              subText: "Map",
            },
          ]}
          detailedInfo={["Level 3", "Level 2", "Level 1"]}
          nav={"FeedbackForm"}
          navigation={navigation}
        />
      </SpacedColumn>
    </View>
  );
};

export default ResultPage;
