import { useState } from "react";
import { getLocation } from "../../utils/location";
import IconButton from "./IconButton";

const LocationButton = ({ onStart, onComplete }) => {
    const [ loading, setLoading ] = useState(false);
    
    const completeSeq = (coords) => {
        setLoading(false);
        if (onComplete) onComplete(coords);
    };

    return <IconButton
    label={loading ? "Finding your location..." : "Use my location"}
    enabled={!loading}
    onPress={() => {
        if (onStart) onStart();
        
        setLoading(true);

        getLocation().then((loc) => {
            const { latitude, longitude } = loc.coords;
            completeSeq(`${latitude},${longitude}`);
        }).catch((_) => {
            completeSeq();
        });
    }}
  />
};

export default LocationButton;