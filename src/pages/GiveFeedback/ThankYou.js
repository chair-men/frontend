import { View } from "react-native";
import CText from "../../widgets/CText";
import TextButton from "../../widgets/TextButton";

const ThankYou = ({ navigation }) => {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 50,
        backgroundColor: CColors.backdrop,
      }}
    >
      <CText styles={{ marginVertical: 20, fontSize: 25 }}>
        Your feedback has been recorded!
      </CText>
      <CText styles={{ marginVertical: 20, fontSize: 25 }}>
        Thank you for making your community a better place for all!
      </CText>
      <TextButton
        label={"Go Back"}
        onPress={() => {
          navigation.navigate("EntryPage");
        }}
        styles={{ width: "70%", marginVertical: 40, }}
        textStyle={{ fontSize: 20, }}
      />
    </View>
  );
};

export default ThankYou;
