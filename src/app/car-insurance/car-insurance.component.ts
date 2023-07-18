import { Component, OnInit } from '@angular/core';
import { CarInsuranceService } from './services/car-insurance.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// declare var RazorPay: any;
function _window():any {
  return window;
}

@Component({
  selector: 'app-car-insurance',
  templateUrl: './car-insurance.component.html',
  styleUrls: ['./car-insurance.component.scss'],
})
export class CarInsuranceComponent implements OnInit {
  // Observable for updating Payment value
  totalPremiumReceived!: Observable<Number>;

  // For RazorPay integration
  window!: any;
  get nativeWindow(){
    return _window()
  }
  
  // progress meter
  

  constructor(public carInsSvc: CarInsuranceService, public router: Router) {
  }
  
  ngOnInit(): void {
    this.totalPremiumReceived = this.carInsSvc.totalPremiumObs$;
  }

  options = {
    key: 'rzp_test_wMDiYhxgy6FiDj',
    amount: '1000000',
    currency: 'INR',
    name: 'All State Insurance Corporations ltd',
    discription: 'Testing RazorPay Integration',
    image: 'https://picsum.photos/200',
    callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
    order_id: '',
    prefill: {
      name: 'xyz Kumar',
      email: 'xyz@gmail.com',
      contact: '9989454759',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#ffc107',
    },
    model: {
      ondismiss: () => {
        console.log('dismissed');
      },
    },
  };
  
  payNow() {

    const rzp1 = new this.nativeWindow.Razorpay(this.options);
    rzp1.open();

    this.carInsSvc.setFinalPaymentCompleted(true);
  }
}

// const successCallback = (paymentId: any) => {
//   console.log(paymentId);
// };

// const failureCallback = (err: any) => {
//   console.log(err);
// };

// RazorPay.open(options, successCallback, failureCallback);