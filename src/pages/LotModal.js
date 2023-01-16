import { View } from "react-native";
import CColors from "../constants/CColors";
import CText from "../widgets/CText";
import Accordion from "../widgets/Accordion";
import TextButton from "../widgets/TextButton";
import { getFeedback, setLicenseplate } from "../api";
import { useEffect, useState } from "react";
import SpacedColumn from "../widgets/SpacedColumn";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ClickableIcon from "../widgets/ClickableIcon";

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
  const { lot, licensePlate } = route.params;
  const [feedbacks, setFeedbacks] = useState([]);
  const [errorMsg, setErrorMsg] = useState();

  if (!licensePlate)
    useEffect(() => {
      getFeedback(lot.id)
        .then(({ data: data }) => {
          setFeedbacks(data);
        })
        .catch((e) => {
          console.log("Failed to get feedbacks");
        });
    }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.pop()}
      style={{
        // flex: 1,
        backgroundColor: "rgba(209, 209, 209, 0.4)",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        width: "100%",
        height: "100%",
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {}}
        style={{
          width: "80%",
          //   height: "100%",
          borderRadius: 20,
          padding: 20,
          backgroundColor: CColors.backdrop,
        }}
      >
        <SpacedColumn width="100%" alignItems="stretch">
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              marginTop: 30, 
              padding: 20,
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
          {!licensePlate && (
            <Accordion
              topComponent={
                <CText
                  styles={{
                    backgroundColor: CColors.button,
                    padding: 10,
                    marginTop: 20,
                    borderRadius: 10,
                  }}
                >
                  View Past Feedback
                </CText>
              }
            >
              {feedbacks.length > 0 && (
                <SpacedColumn>
                  {feedbacks.map((feedback, i) => {
                    return (
                      <CText
                        key={i}
                        styles={{
                          backgroundColor: CColors.accordion,
                          borderRadius: 10,
                          marginTop: 10,
                          paddingHorizontal: 20,
                        }}
                      >
                        {`Issue(s): ${feedback.kerb ? "Kerb, " : ""}${
                          feedback.paint ? "Paint, " : ""
                        }${feedback.other}\n`}
                        {`Status: ${feedback.jobStatus}\nETA: ${feedback.eta}`}
                      </CText>
                    );
                  })}
                </SpacedColumn>
              )}
              {feedbacks.length === 0 && (
                <CText
                  styles={{
                    backgroundColor: CColors.accordion,
                    borderRadius: 10,
                    marginTop: 20,
                    padding: 10,
                  }}
                >
                  No previous feedback
                </CText>
              )}
            </Accordion>
          )}
          <TextButton
            styles={{
              borderRadius: 10,
              marginVertical: 20,
              padding: 10,
            }}
            textStyle={{ fontSize: 20 }}
            label={
              licensePlate
                ? `Mark this lot for '${licensePlate}'`
                : "Give Feedback"
            }
            onPress={() => {
              setErrorMsg();
              if (licensePlate) {
                setLicenseplate(lot.id, licensePlate)
                  .then(({ data }) => {
                    if (data === "OK")
                      navigation.navigate("ConfirmSave", { licensePlate });
                    else setErrorMsg("Failed to mark this lot.");
                  })
                  .catch((_) => setErrorMsg("Failed to mark this lot."));
              } else
                navigation.navigate("FeedbackForm", {
                  id: lot.id,
                  name: lot.lotName,
                });
            }}
          />
          {errorMsg && <CText styles={{ color: "red" }}>{errorMsg}</CText>}
        </SpacedColumn>
        <View
          style={{
            position: "absolute",
            right: 5,
            top: 5,
          }}
        >
          <ClickableIcon iconName="window-close" onPress={() => navigation.pop()} />
        </View>
      </TouchableWithoutFeedback>
    </TouchableWithoutFeedback>
  );
};

export default LotModal;
