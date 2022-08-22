import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IVehicle, IVehicleData, IVehicleDataAll, IVehicles } from '../core/entities/entities.index';

@Injectable()
export class VehicleService {

  constructor(private readonly http: HttpClient) { }

  getByVehicle(): Observable<Array<IVehicle>> {
    return this.http.get<IVehicles>(`${environment.URL_BASE}/vehicle`)
      .pipe(
        map((response) => { return response?.vehicles})
      );
  }

  getByVehicleDataAll(): Observable<Array<IVehicleData>> {
    return this.http.get<IVehicleDataAll>(`${environment.URL_BASE}/vehicleData`)
      .pipe(
        map((response) => { return response?.vehicleData})
      );
  }

  getByVehicleDataId(id: number | undefined): Observable<IVehicleData> {
    console.log('id front - ', id)
    return this.http.get<IVehicleData>(`${environment.URL_BASE}/vehicleData/${id}`).pipe(take(1));
  }

  createVehicleData(vehicleData: IVehicleData){
    return this.http.post(`${environment.URL_BASE}/vehicleData`, vehicleData).pipe(take(1));
  }

  updateVehicleData(vehicleData: IVehicleData){
    return this.http.patch(`${environment.URL_BASE}/vehicleData/${vehicleData.id}`, vehicleData).pipe(take(1));
  }

  deleteVehicleData(id: number){
    return this.http.delete(`${environment.URL_BASE}/vehicleData/${id}`).pipe(take(1));
  }
}
