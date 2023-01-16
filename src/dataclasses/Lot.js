export default class Lot {
    constructor() {
        this.id = "";
        this.carparkId = "";
        this.levelId = "";
        this.lotName = "";
        this.coordinates = [];
        this.feedback = [];
        this.vacant = true;
        this.licensePlate = "";
    }

    static fromJSON(json) {
        let lt = new Lot();
        
        lt.id = json["id"] || "";
        lt.carparkId = json["carpark_id"] || "";
        lt.levelId = json["level"] || "";
        lt.lotName = json["lotnumber"] || "";
        lt.coordinates = json["coords"] || [];
        lt.feedback = json["feedback"] || [];
        lt.vacant = json["vacant"];
        if (lt.vacant === undefined) lt.vacant = true;
        lt.licensePlate = json["platenumber"] || "";

        return lt;
    }
}