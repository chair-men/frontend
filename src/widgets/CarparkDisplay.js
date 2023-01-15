import { View } from "react-native";
import CColors from "../constants/CColors";
import Accordion from "./Accordion";
import CText from "./CText";
import SpacedColumn from "./SpacedColumn";
import SpacedRow from "./SpacedRow";

const spacing = 5;
const mainFontSize = 24;
const subFontSize = 14;

const CarparkDisplay = ({ name, warningMessage, info, detailedInfo }) => {
  return (
    <Accordion
      topComponent={
        <View
          style={{
            backgroundColor: CColors.backdrop,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 30,
            paddingVertical: 20,
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
            {warningMessage && <CText styles={{ fontSize: subFontSize, color: "red" }}>
              {warningMessage}
            </CText>}
          </SpacedColumn>

          <SpacedRow spacing={20}>
            {info &&
              info.map((x, idx) => (
                <SpacedColumn key={idx} spacing={spacing}>
                  <CText styles={{ fontSize: mainFontSize }}>{x.value}</CText>
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
                <View
                  style={{
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: spacing,
                    width: "100%",
                    alignSelf: "center",
                  }}
                >
                  {info.map((x) => {
                    return <CText styles={{ fontWeight: "bold" }}>{x}</CText>;
                  })}
                </View>
              ) : (
                <CText styles={{ fontWeight: "bold", padding: spacing }}>{info}</CText>
              )}
            </SpacedColumn>
          ))}
      </View>
    </Accordion>
  );
};

export default CarparkDisplay;
