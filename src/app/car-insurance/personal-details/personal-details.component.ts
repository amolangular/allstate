import { Component, OnInit } from '@angular/core';
import { CarInsuranceService } from '../services/car-insurance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit{
  personalDetails!:FormGroup;
  insuranceData:any;
  ownershipDetailsCompleted:boolean=false;

  constructor(private carInsSvc:CarInsuranceService,private fb:FormBuilder){
    this.insuranceData = this.carInsSvc.carInsuranceModal;
  }
  ngOnInit(): void {
   this.createForm();
  }

  createForm(){
    this.personalDetails = this.fb.group({
      "owner-details":this.fb.group({
          "fullName":['',[Validators.required]],
          "pincode":['',[Validators.required]],
          "emailAddress":['',[Validators.required]],
          "mobileNumber":['',[Validators.required]],
          "sendUpdatesViaWhatsApp":[false],
          "address":['',[]],
          "nomineeName":['',[Validators.required]],
          "nomineeRelationShip":['']
      }),
      "car-details":this.fb.group({
        "regNumber":[''],
        "chasisNumber":['',[Validators.required]],
        "engineNumber":['',[]],
        "isCarLoanTaken":[false],
        "bankLoanProvider":['']
      })
    })
  }

  
}
