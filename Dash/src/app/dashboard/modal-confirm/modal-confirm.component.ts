import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit {
  public eventName: string = "deletar"
  public title: string = `Deseja ${this.eventName} dado de Veiculo`;
  public vehicleDataID!: number;

  constructor(public bsModalRef: BsModalRef,
    private vehicleService: VehicleService) { }

  ngOnInit(): void {
  }

  confirm(){
    this.vehicleService.deleteVehicleData(this.vehicleDataID).subscribe(
      success => console.log("Deletado com Sucesso: ", this.vehicleDataID),
      error => console.error(error, "id: ", this.vehicleDataID),
      () => console.log("Request Completado!!!")
    );
    this.bsModalRef.hide();
  }

}
