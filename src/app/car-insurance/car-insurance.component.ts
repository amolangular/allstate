import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarInsuranceService } from './services/car-insurance.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-car-insurance',
  templateUrl: './car-insurance.component.html',
  styleUrls: ['./car-insurance.component.scss']
})
export class CarInsuranceComponent implements OnInit{
  // eligiblePaths:string[]=['/car-insurance/']
  totalPremiumReceived!:Observable<Number>;

  constructor(public router:Router,private carInsSvc:CarInsuranceService){
   
  }
  ngOnInit(){
   this.totalPremiumReceived = this.carInsSvc.totalPremiumObs$
  }
}
