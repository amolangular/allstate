import { Component, Input } from '@angular/core';
import { CarInsuranceService } from '../services/car-insurance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cost-brakeup',
  templateUrl: './cost-brakeup.component.html',
  styleUrls: ['./cost-brakeup.component.scss']
})
export class CostBrakeupComponent {

  @Input() insuranceData!:any

  constructor(private carInsSvc: CarInsuranceService, public router: Router){
    this.insuranceData = carInsSvc.carInsuranceModal;
  }

}
