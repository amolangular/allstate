import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarInsuranceService } from './services/car-insurance.service';
import { Observable } from 'rxjs';

function _window(): any {
  // return the global native browser window object
  return window;
}



@Component({
  selector: 'app-car-insurance',
  templateUrl: './car-insurance.component.html',
  styleUrls: ['./car-insurance.component.scss']
})
export class CarInsuranceComponent implements OnInit{
  // eligiblePaths:string[]=['/car-insurance/']
  window:any ;
  totalPremiumReceived!:Observable<Number>;
  get nativeWindow(){
    return _window();
  }

  constructor(public router:Router,private carInsSvc:CarInsuranceService){
  
  }
  ngOnInit(){
   this.totalPremiumReceived = this.carInsSvc.totalPremiumObs$
  }

  options = {
    "key": "rzp_test_ajHjw0CX9kEfST", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

payNow(){
 // this.options.amount = "50000";
  // this.options.order_id = "";

  var rzp1 = new this.nativeWindow.Razorpay(this.options);
  rzp1.open();
}
}
