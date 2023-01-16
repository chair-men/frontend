import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CColors from "../constants/CColors";
import Accordion from "./Accordion";
import CText from "./CText";
import SpacedColumn from "./SpacedColumn";
import SpacedRow from "./SpacedRow";
import TextButton from "./TextButton";

const spacing = 5;
const mainFontSize = 22;
const subFontSize = 14;

const CarparkDisplay = ({ navigation, name, warningMessage, info, detailedInfo, nav }) => {
  return (
    <Accordion
      topComponent={
        <View
          style={{
            backgroundColor: CColors.backdrop,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
            marginTop: 20,
            width: "90%",
            alignSelf: "center",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <SpacedColumn spacing={spacing}>
            <CText styles={{ fontSize: mainFontSize, fontWeight: "bold" }}>
              {name}
            </CText>
            {warningMessage && (
              <CText styles={{ fontSize: subFontSize, color: "red" }}>
                {warningMessage}
              </CText>
            )}
          </SpacedColumn>

          <SpacedRow spacing={20}>
            {info &&
              info.map((x, idx) => (
                <SpacedColumn key={idx} spacing={spacing}>
                  <CText
                    styles={{
                      fontSize: mainFontSize,
                      minHeight: 30,
                      maxHeight: 30,
                    }}
                  >
                    {x.value}
                  </CText>
                  <CText styles={{ fontSize: subFontSize }}>{x.subText}</CText>
                </SpacedColumn>
              ))}
          </SpacedRow>
        </View>
      }
    >
      <View
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingHorizontal: 30,
          paddingVertical: 20,
          width: "90%",
          alignSelf: "center",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        {detailedInfo &&
          detailedInfo.map((info, idx) => (
            <SpacedColumn key={idx}>
              {Array.isArray(info) ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    paddingTop: spacing,
                    paddingBottom: spacing,
                    width: "100%",
                    alignSelf: "center",
                    margin: 0,
                  }}
                  onPress={() => {
                    navigation.navigate(nav, { carpark: name + ' ' + info[0] });
                  }}
                >
                  {info.map((x, i) => {
                    return (
                      <CText key={i} styles={{ fontWeight: "bold" }}>
                        {x}
                      </CText>
                    );
                  })}
                </TouchableOpacity>
              ) : (
                
                <TextButton
                  label={info}
                  styles={{
                    padding: spacing,
                    width: "100%",
                    backgroundColor: "white",
                  }}
                  textStyle={{ fontWeight: "bold", fontSize: 20 }}
                  onPress={() => {
                    navigation.navigate(nav, { carpark: name + ' ' + info });
                  }}
                />
              )}
            </SpacedColumn>
          ))}
      </View>
    </Accordion>
  );
};

export default CarparkDisplay;
