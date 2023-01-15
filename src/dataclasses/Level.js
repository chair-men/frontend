import Lot from "./Lot";

export default class Level {
    constructor() {
        this.id = "";
        this.lots = [];
    }

    static fromJSON(json) {
        let lvl = new Level();
        lvl.id = json["id"] || "";

        const lts = json["lots"];

        if (lts) lvl.lots = lts.map((lt_json, i) => Lot.fromJSON(lt_json));
    }
}