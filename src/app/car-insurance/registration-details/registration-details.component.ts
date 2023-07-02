import { Component, OnInit } from '@angular/core';
import { CarInsuranceService } from '../services/car-insurance.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.scss']
})
export class RegistrationDetailsComponent implements OnInit {

  insuranceData:any;
  constructor(private carInsSvc:CarInsuranceService,private http:HttpService){
     this.insuranceData = this.carInsSvc.carInsuranceModal;
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}
