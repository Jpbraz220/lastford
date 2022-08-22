export interface IVehicleDataAll {
    vehicleData: Array<IVehicleData>;
}

export interface IVehicleData {
    id?: number;
    vin: string;
    odometer: string;
    tirePressure: string;
    status: string;
    batteryStatus: string;
    fuelLevel: string;
    lat: string;
    longi: string;
}