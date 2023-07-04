import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarInsuranceService {

  totalPremium = new BehaviorSubject<Number>(0);
  totalPremiumObs$ = this.totalPremium.asObservable();


  carInsuranceModal:any = {
    "brandName":"",
    "modelName":"",
    "variantName":"",
    "selectedPlan":{
       "planName":"",
       "planInfo":{},
       "selectedIdv":0, 
       "costCoverage":{
        "netPremium":0,
        "thirdPartyPremium":0,
        "ownDamagePremium":0,
        "addOnsPremium":0,
        "ncbDiscount":0,
       }
    },
    "registration-details":{
      
    },
    "personal-details":{
      "owner-details":{

      },
      "car-details":{
        
      }
    }
  }
 
  constructor() { }

  // getCarInsuranceModal() {
  //   return new CarInsurance();
  // }


  sendTotalPremium(amount:number){
    this.totalPremium.next(amount);
  }

}

export class CarInsurance {
  brandName!: string;
  modelName!: string;
  variantName!: string;
}
