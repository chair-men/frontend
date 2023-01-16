import { View, FlatList, Text } from "react-native";
import CColors from "../constants/CColors";
import CText from "../widgets/CText";
import Header from "../widgets/Header";
import Accordion from "../widgets/Accordion";
import TextButton from "../widgets/TextButton";
import { getFeedback } from "../api";
import { useEffect, useState } from "react";

const LotInfo = ({ prop, value }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <CText>{prop}</CText>
      <CText styles={{ fontWeight: "bold" }}>{value}</CText>
    </View>
  );
};

const LotModal = ({ navigation, route }) => {
  const { lot } = route.params;
  const [feedbacks, setFeedbacks] = useState([
    {
      kerb: true,
      paint: true,
      other: "blah",
      jobStatus: "Pending",
      eta: "TBC",
    },
  ]);
  useEffect(() => {
    getFeedback(lot.lotName)
      .then((f) => setFeedbacks(f))
      .catch(() => {
        console.log("Failed to get feedbacks");
        setFeedbacks([
          {
            kerb: true,
            paint: true,
            other: "blah",
            jobStatus: "Pending",
            eta: "TBC",
          },
        ]);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(209, 209, 209, 0.4)",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <View
        style={{
          width: "100%",
          //   height: "100%",
          borderRadius: 20,
          backgroundColor: CColors.backdrop,
        }}
      >
        <Header styles={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          <CText>Feedback Form</CText>
        </Header>
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            alignSelf: "center",
            margin: 10,
            borderRadius: 20,
            padding: 10,
          }}
        >
          <CText
            styles={{ fontWeight: "bold", marginBottom: 30, fontSize: 30 }}
          >
            Lot Information
          </CText>
          <LotInfo prop={`Carpark Location:`} value={`${lot.carparkId}`} />
          <LotInfo prop={`Level:`} value={`${lot.levelId}`} />
          <LotInfo prop={`Lot Name:`} value={`${lot.lotName}`} />
        </View>
        <Accordion
          topComponent={
            <CText
              styles={{
                backgroundColor: CColors.button,
                width: "80%",
                alignSelf: "center",
                borderRadius: 10,
                marginTop: 20,
                padding: 10,
              }}
            >
              View Past Feedback
            </CText>
          }
        >
          {feedbacks.map((feedback, i) => {
            return <CText
              key={i}
              styles={{
                backgroundColor: CColors.accordion,
                width: "80%",
                alignSelf: "center",
                borderRadius: 10,
                marginTop: 20,
                padding: 10,
              }}
            >
              {`Issue(s): ${feedback.kerb && "kerb, "}${
                feedback.paint && "paint, "
              }${feedback.other}\n`}
              {`Status: ${feedback.jobStatus}\nETA: ${feedback.eta}`}
            </CText>;
          })}
        </Accordion>
        <TextButton
          styles={{
            width: "80%",
            alignSelf: "center",
            borderRadius: 10,
            marginVertical: 20,
            padding: 10,
          }}
          textStyle={{ fontSize: 20 }}
          label={"Give Feedback"}
          onPress={() => {
            navigation.navigate("FeedbackForm", { carpark: lot.lotName });
          }}
        />
      </View>
    </View>
  );
};

export default LotModal;
