import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarInsuranceService {

  carInsuranceModal:CarInsurance = {
    "brandName":"",
    "modelName":"",
    "variantName":"",
  }
 
  constructor() { }

  // getCarInsuranceModal() {
  //   return new CarInsurance();
  // }
}

export class CarInsurance {
  brandName!: string;
  modelName!: string;
  variantName!: string;
}
