import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarInsuranceService {

  totalPremium =new BehaviorSubject<Number>(0);
  totalPremiumObs$ = this.totalPremium.asObservable();

  basicDetailsCompleted: boolean = false;
  choosePlanCompleted: boolean = false;
  personalDetailsCompleted: boolean = false;
  finalPaymentCompleted: boolean = false;

  progress = new BehaviorSubject<number>(0);
  progressObs$ = this.progress.asObservable();

  constructor() { }

  carInsuranceModal:any = {
    "brandName":"",
    "modelName":"",
    "variantName":"",
    "registrationInfo":{
      "registrationYear": "",
      "registrationMonth": "",
      "registrationCity": "",
      "thirdPartyExpiryDate": "",
      "ownDamageExpiryDate": "",
    },
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
        "totalAmount":0,
        "gstAmount":0
       }
    }
  }
 
  sendTotalPremium(amount:number){
    this.totalPremium.next(amount);
  }


  // For Progress bar

  setBasicDetailsCompleted(done:boolean){
    this.basicDetailsCompleted = done;
    this.updateProgress()
  }
  setChoosePlanDetailsCompleted(done:boolean){
    this.choosePlanCompleted = done;
    this.updateProgress()
  }
  setPersonalDetailsCompleted(done:boolean){
    this.personalDetailsCompleted = done;
    this.updateProgress()
  }
  setFinalPaymentCompleted(done:boolean){
    this.finalPaymentCompleted = done;
    this.updateProgress()
  }

  updateProgress(){
    let progress = 0;
    console.log('calculate progress')

    if(this.basicDetailsCompleted){
      progress += 25;
      // this.progress.next(+25);
    }

    if(this.choosePlanCompleted){
      progress += 25;
      // this.progress.next(+25)
    }

    if(this.personalDetailsCompleted){
      progress += 25;
      // this.progress.next(+25)
    }

    if(this.finalPaymentCompleted){
      progress += 25;
      // this.progress.next(+25)
    }

    this.progress.next(progress)
  }
}


export class CarInsurance {
  brandName!: string;
  modelName!: string;
  variantName!: string;
  registrationInfo!: {
    registrationYear: string;
    registrationMonth: string;
    registrationCity: string;
    thirdPartyExpiryDate: string;
    ownDamageExpiryDate: string;
  };
}
