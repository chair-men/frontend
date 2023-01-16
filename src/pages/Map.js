import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

const Map = ({ markers, initialCoords, navigation, route }) => {
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
        {/* {markers.map((marker, i) => {
          if (marker?.coordinates?.latitude) {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: marker.coordinates.latitude,
                  longitude: marker.coordinates.longitude,
                }}
                title={`${marker.address}`}
                onCalloutPress={() => {
                  navigation.navigate("AvailableParkingResultPage", {
                    postalCode: marker.postalCode
                  });
                }}
              />
            );
          }
        })} */}
      </MapView>
    </View>
  );
};

export default Map;
