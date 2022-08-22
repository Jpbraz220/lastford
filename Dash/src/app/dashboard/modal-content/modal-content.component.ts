import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IVehicleData } from 'src/app/core/entities/entities.index';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent implements OnInit {
  public title?: string = "Adicionar novo dado de Veiculo";
  public closeBtnName?: string = "Fechar";
  public saveBtnName?: string = "Salvar";
  public vehicleData!: IVehicleData | undefined;

  public submitted = false;
  public form!: FormGroup;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      vin: [null, [Validators.required, Validators.minLength(20), Validators.maxLength(20)]],
      odometer: [null, [Validators.required]],
      tirePressure: [null, [Validators.required]],
      fuelLevel: [null, [Validators.required]],
      batteryStatus: [ null, [Validators.required]],
      status: [null, [Validators.required]],
      lat: [null, [Validators.required]],
      longi: [null, [Validators.required]]
    })

    if(this.vehicleData) {
      this.updateForm(this.vehicleData);
    }

  }

  updateForm(vehicleData: IVehicleData){
    this.form.patchValue({
      id: vehicleData.id,
      vin: vehicleData.vin,
      odometer: vehicleData.odometer,
      tirePressure: vehicleData.tirePressure,
      fuelLevel: vehicleData.fuelLevel,
      batteryStatus: vehicleData.batteryStatus,
      status: vehicleData.status,
      lat: vehicleData.lat,
      longi: vehicleData.longi
    })
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value)
    if(this.form.valid && !this.vehicleData){
      this.vehicleService.createVehicleData(this.form.value).subscribe(
        success => console.log("Criado com Sucesso", success),
        error => console.error(error),
        () => console.log("Request Completado!!!")  
      );
    } else if(this.form.valid) {
      this.vehicleService.updateVehicleData(this.form.value).subscribe(
        success => console.log("Alterado com Sucesso: ", this.form.get('id')?.value),
        error => console.error(error),
        () => console.log("Request Completado!!!")  
      );
    }
    this.bsModalRef.hide();
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
    this.bsModalRef.hide();
  }

  hasError(field: string){
    return this.form.get(field)?.errors;
  }

}
