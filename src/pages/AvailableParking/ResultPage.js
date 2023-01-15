import { View } from "react-native";
import CColors from "../../constants/CColors";
import SpacedColumn from "../../widgets/SpacedColumn";
import CText from "../../widgets/CText";
import InputBox from "../../widgets/InputBox";
import IconButton from "../../widgets/IconButton";
import Header from "../../widgets/Header";
import CarparkDisplay from "../../widgets/CarparkDisplay";

const ResultPage = ({ route }) => {
  const { postalCode } = route.params;
  return (
    <View>
      <Header>
        <CText>
          Showing results for{" "}
          <CText styles={{ fontWeight: "bold" }}>{postalCode}</CText>
        </CText>
      </Header>
      <SpacedColumn alignItems="stretch" width="100%" spacing={20}>
        <CarparkDisplay
          name="Blk 427"
          warningMessage="warning"
          info={[
            { value: 0.5, subText: "km away" },
            { value: 5, subText: "lots" },
          ]}
          detailedInfo={[['Level 3', '3 lots'], ['Level 2', '1 lot'], ['Level 1', '1 lot']]}
          // detailedInfo={['Level 1', 'Level 2', 'Level 3']}
        />
        <CarparkDisplay
          name="Blk 427"
          warningMessage="warning"
          info={[
            { value: 0.5, subText: "km away" },
            { value: 5, subText: "lots" },
          ]}
          // detailedInfo={[['Level 3', '3 lots'], ['Level 2', '1 lot'], ['Level 1', '1 lot']]}
          detailedInfo={['Level 1', 'Level 2', 'Level 3']}
        />
      </SpacedColumn>
    </View>
  );
};

export default ResultPage;
