import Level from "./Level";

export default class Carpark {
    constructor() {
        this.id = "";
        this.name = "";
        this.coordinates = "";
        this.renovation = false;
        this.levels = [];
    }

    static fromJSON(json) {
        let cp = new Carpark();
        cp.id = json["id"] || "";
        cp.name = json["name"] || "";
        cp.coordinates = json["coordinates"] || { lat: undefined, lng: undefined };
        cp.renovation = json["renovation"] || false;
        
        const lvls = json["levels"];
        if (lvls) cp.levels = lvls.map((lvl_json, i) => Level.fromJSON(lvl_json));

        return cp;
    }
};