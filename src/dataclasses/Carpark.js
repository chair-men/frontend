import Level from "./Level";

export default class Carpark {
    constructor() {
        this.id = "";
        this.address = "";
        this.levels = [];
    }

    static fromJSON(json) {
        let cp = new Carpark();
        cp.id = json["id"] || "";
        cp.address = json["address"] || "";
        
        const lvls = json["levels"];
        if (lvls) cp.levels = lvls.map((lvl_json, i) => Level.fromJSON(lvl_json));

        return cp;
    }
};