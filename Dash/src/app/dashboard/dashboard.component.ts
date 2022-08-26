import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged, filter, find, map, switchMap, tap } from 'rxjs/operators';
import { IVehicle, IVehicleData } from '../core/entities/entities.index';
import { VehicleService } from './vehicle.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { Chart, registerables } from 'chart.js';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { R3TargetBinder } from '@angular/compiler';

Chart.register(...registerables)

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{

  public title: string = "Dashboard FORD";
  public vehicles$!: Observable<Array<IVehicle>>;
  public vehiclesData$!: Observable<any>;
  public vehicle!: IVehicle | undefined;
  public vehicleData!: IVehicleData | undefined | null;
  public subscribe!: Subscription;
  public vehiclesDataSubscribe!: Subscription;
  public list!: Array<IVehicleData>;
  public isTrusted: boolean = false;
  public subscriptions: Subscription[] = [];
  public chartExample1!: Chart;
  public chartExample2!: Chart;

  @ViewChild("myChart", { static: true}) myChart!: ElementRef;
  @ViewChild("myChart2", { static: true}) myChart2!: ElementRef;

  bsModalRef?: BsModalRef;

  form = new FormGroup({
    vehicle: new FormControl(null),
    vehicleDataID: new FormControl(null)
  })

  isSideNavCollapsed = false;
  screenWidth = 0;
  constructor(private readonly vehicleService: VehicleService, private modalService: BsModalService, private changeDetection: ChangeDetectorRef){}

  onToggleSideNav(data: SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  ngOnInit(): void {
    this.getVehicles();
    this.getVehiclesDataAll();
    this.vehiclesDataSubscribe = this.form.controls['vehicleDataID'].valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 19),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this.vehicleService.getByVehicleDataId(this.treatCode(value))),
      ).subscribe(
        (vehicleData) => {
        this.vehicleData = vehicleData;
        },
        (error)=> {
          alert('Código - Vin com erro.');
          console.log(error);
          this.vehicleData = null;
        }
      );


  }

  treatCode(value: string): number | undefined{
    console.log('this.list', this.list)
    return this.list.find(item => item.vin == value)?.id
  }

  ngOnDestroy(): void {
    if(this.subscribe){
      this.subscribe.unsubscribe();
    }
    if(this.vehiclesDataSubscribe){
      this.vehiclesDataSubscribe.unsubscribe();
    }
  }

  getVehicles(): void {
    this.vehicles$ = this.vehicleService.getByVehicle();
  }

  getVehiclesDataAll(): void {
    this.vehicleService.getByVehicleDataAll().subscribe(
      (vehicle) => {
        this.list = vehicle;
      }
    );
  }

  getSubCategories(event: any){
    if(this.chartExample1){
      this.chartExample1.destroy();
    }
    if(this.chartExample2){
      this.chartExample2.destroy();
    }
    this.isTrusted = event.isTrusted;
    this.subscribe = this.vehicles$
    .pipe(map((item: Array<IVehicle>) => item.find(e => e.id == this.form.controls['vehicle'].value)))
    .subscribe((vehicle) => {
      this.vehicle = vehicle;
      console.log('this.vehicle', this.vehicle)
      let result = this.vehicle ? this.vehicle.connected*100/this.vehicle.volumetotal : 0;
      let result2 = this.vehicle ? this.vehicle.softwareUpdates*100/this.vehicle.volumetotal : 0;
      let resultp = Math.round(result).toFixed(2);
      let result2p = Math.round(result2).toFixed(2);

      console.log('result', result)
      this.chartExample1 = new Chart(this.myChart.nativeElement, {
          type: 'doughnut',
          data: {
            labels: [`${resultp}%`],
            datasets: [{
              label: 'My First Dataset',
              data: [result, 100-result],
              backgroundColor: [
                'rgb(0, 16, 90)',
                '#dcdcdc'
              ],
              hoverOffset: 4,
            }]
          },
          options: {
            plugins: {
              legend: {
                position: 'bottom',
                labels: {boxWidth: 0, boxHeight: 0, color: 'rgb(0, 16, 90)', font: {size: 18, weight: 'bold',}  }
                }
            }}
        });
        this.chartExample2 = new Chart(this.myChart2.nativeElement, {
          type: 'doughnut',
          data: {
            labels: [`${result2p}%`],
            datasets: [{
              label: 'My First Dataset',
              data: [result2, 100-result2],
              backgroundColor: [
                'rgb(0, 16, 90)',
                '#dcdcdc'
              ],
              hoverOffset: 4
            }]
          },
          options: {
            plugins: {
              legend: {
                position: 'bottom',
                labels: {boxWidth: 0, boxHeight: 0, color: 'rgb(0, 16, 90)', font: {size: 18, weight: 'bold',}  }
                }
            }}
        });
    })
  }

  getImage(): string | undefined{
    let name = this.vehicle?.vehicle.replace(/\s/g, '').toLowerCase();
    return `assets/img/${name}.png`
  }

  onCreate(){
    const initialState: ModalOptions = {
        initialState: {
          title: 'Adicionar novo dados de Veiculo'
        }
      };
      this.bsModalRef = this.modalService.show(ModalContentComponent, initialState);
      this.bsModalRef.content.closeBtnName = 'Fechar';
  }

  onEdit(vehicleDataID: any){
    console.log('onEdit')
    console.log('vehicleDataID', vehicleDataID)
    let vehicleData$ = this.vehicleService.getByVehicleDataId(vehicleDataID);
    vehicleData$.subscribe( vehicleData => {
      const initialState: ModalOptions = {
        initialState: {
          title: 'Atualizar dados de Veiculo',
          vehicleData
        }
      };
      this.bsModalRef = this.modalService.show(ModalContentComponent, initialState);
      this.bsModalRef.content.closeBtnName = 'Fechar';
    })

  }

  onDelete(vehicleDataID: any){
    console.log('onDelete')
    console.log('vehicleDataID', vehicleDataID)

    const _combine = combineLatest([
      this.modalService.onShow,
      this.modalService.onShown,
      this.modalService.onHide,
      this.modalService.onHidden
    ]).subscribe(() => this.changeDetection.markForCheck());

    const initialState: ModalOptions = {
      initialState: {
        eventName: 'deletar',
        vehicleDataID: vehicleDataID
      }
    };


    this.subscriptions.push(
      this.modalService.onHide.subscribe((reason: string | any) => {
        console.log('reason', reason)
        console.log('onHidden');
        // if (typeof reason !== 'string') {
        //   console.log('reason: ', reason)
        //   this.vehicleData = null;
        //   this.form.reset();
        // }
      })
    );

    this.subscriptions.push(_combine);

    this.bsModalRef = this.modalService.show(ModalConfirmComponent, initialState);
  }


}
