export interface IVehicles {
    vehicles: Array<IVehicle>;
}

export interface IVehicle {
    id: number;
    connected: number;
    softwareUpdates: number;
    vehicle: string;
    volumetotal: number;
}