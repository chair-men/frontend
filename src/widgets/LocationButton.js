import { useState } from "react";
import { getLocation } from "../../utils/location";
import IconButton from "./IconButton";

const LocationButton = ({ enabled, onStart, onComplete }) => {
    if (enabled === undefined) enabled = true;
    const [ loading, setLoading ] = useState(false);
    
    const completeSeq = (coords) => {
        setLoading(false);
        if (onComplete) onComplete(coords);
    };

    return <IconButton
    label={loading ? "Finding your location..." : "Use my location"}
    enabled={!loading && enabled}
    onPress={() => {
        if (onStart) onStart();

        setLoading(true);

        getLocation().then((loc) => {
            const { latitude, longitude } = loc.coords;
            completeSeq({ lat: latitude, lng: longitude });
        }).catch((_) => {
            completeSeq();
        });
    }}
  />
};

export default LocationButton;