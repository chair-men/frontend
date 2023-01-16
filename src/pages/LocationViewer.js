import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

const LocationViewer = ({ initialCoords, navigation, route }) => {
  let marker = route.params.marker;

  const coords = {
    latitude: 1.3521,
    longitude: 103.8198,
    latitudeDelta: 0.85,
    longitudeDelta: 0.0921,
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        region={initialCoords || coords}
        onPanDrag={() => {}}
      >
        {marker && (
          <Marker
            coordinate={{
              latitude: parseFloat(marker.coordinates[0]),
              longitude: parseFloat(marker.coordinates[1]),
            }}
            title={`${marker.name}`}
            onCalloutPress={() => {
              navigation.navigate("AvailableParkingResultPage", {
                postalCode: marker?.postalCode,
              });
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default LocationViewer;
