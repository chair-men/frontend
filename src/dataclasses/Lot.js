export default class Lot {
    constructor() {
        this.id = "";
        this.carparkId = "";
        this.levelId = "";
        this.lotName = "";
        this.coordinates = [];
        this.isOccupied = false;
        this.licensePlate = "";
    }

    static fromJSON(json) {
        let lt = new Lot();

        lt.id = json["id"] || "";
        lt.carparkId = json["carpark_id"] || "";
        lt.levelId = json["level_id"] || "";
        lt.lotName = json["lot_name"] || "";
        lt.coordinates = json["coordinates"] || [];
        lt.isOccupied = json["is_occupied"] || false;
        lt.licensePlate = json["license_plate"] || "";

        return lt;
    }
}