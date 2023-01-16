import { View, Text, Button, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import CText from "../../widgets/CText";
import Header from "../../widgets/Header";
import { TouchableOpacity } from "react-native-gesture-handler";
import CColors from "../../constants/CColors";
import SpacedRow from "../../widgets/SpacedRow";
import TextButton from "../../widgets/TextButton";
import InputBox from "../../widgets/InputBox";

const Issue = ({ name, value, onValueChange }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "80%",
        alignItems: "center",
        alignSelf: "center",
        marginVertical: 20,
      }}
    >
      <Checkbox value={value} onValueChange={onValueChange} />
      <CText styles={{ paddingLeft: 40 }}>{name}</CText>
    </View>
  );
};

const FeedbackForm = ({ route, navigation }) => {
  const { carpark } = route.params;
  const [image, setImage] = useState(null);
  const [kerb, setKerb] = useState(false);
  const [paint, setPaint] = useState(false);
  const [other, setOther] = useState(false);
  const [otherText, setOtherText] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: CColors.accordion, height: "100%" }}>
      <Header>
        <CText>Feedback for {carpark}</CText>
      </Header>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          aspectRatio: 1,
          borderRadius: 20,
          borderStyle: "dashed",
          borderWidth: 2,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: CColors.backdrop,
          marginVertical: 20,
        }}
        onPress={pickImage}
      >
        {!image && <FontAwesome5 name={"camera"} size={100} />}
        {!image && <CText>Click to take picture</CText>}
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </TouchableOpacity>
      <CText>Please select the issues below:</CText>
      <Issue name={"Kerb Issues"} value={kerb} onValueChange={setKerb} />
      <Issue name={"Paint Issues"} value={paint} onValueChange={setPaint} />
      <Issue
        name={"Others (Please enter below)"}
        value={other}
        onValueChange={setOther}
      />
      <InputBox
        value={otherText}
        onChange={setOtherText}
        styles={{ width: "90%", alignSelf: "center", backgroundColor: CColors.accordion, borderBottomWidth: 1,  }}
      />
      <TextButton
        styles={{
          marginVertical: 30,
          width: "50%",
          alignSelf: "center",
          backgroundColor: CColors.backdrop,
          borderWidth: 1,
        }}
        textStyle={{
          fontWeight: "bold",
          fontSize: 20,
        }}
        label={"Submit"}
        onPress={() => {
          navigation.navigate("ThankYou");
        }}
        enabled={image && (kerb || paint || (other && otherText))}
      />
    </ScrollView>
  );
};

export default FeedbackForm;
