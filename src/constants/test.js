import Carpark from "../dataclasses/Carpark";
import Level from "../dataclasses/Level";

const testCP = new Carpark.fromJSON({
    "id": "testCP",
    "levels": [
        new Level.fromJSON({
            
        })
    ]
});

export { testCP };