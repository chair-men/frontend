import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

const Map = ({ overallList, initial_coords, navigation, route }) => {
  const coords = {
    latitude: 1.3521,
    longitude: 103.8198,
    latitudeDelta: 0.85,
    longitudeDelta: 0.0921,
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <MapView style={{ width: "100%", height: "100%" }} region={initial_coords || coords} onPanDrag={() => {}} />
    </View>
  );
};

export default Map;