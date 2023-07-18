import { Component, OnInit } from '@angular/core';
import { CarInsuranceService } from '../services/car-insurance.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.scss']
})
export class RegistrationDetailsComponent implements OnInit {

  
  yearSelected!: any;
  monthSelected!: any;
  citySelected!: any;
  thirdPartyPolicyExp!: any;
  ownDamagePolicyExp!: any;
  
  insuranceData:any;
  
  constructor(private carInsSvc:CarInsuranceService){
    this.insuranceData = this.carInsSvc.carInsuranceModal;
  }
  
  // For toggle

  sameExpiryDate: boolean = false;
  onToggle(expDate:any){
    if(expDate){
      this.ownDamagePolicyExp = this.thirdPartyPolicyExp;
      this.carInsSvc.carInsuranceModal.registrationInfo.ownDamageExpiryDate = this.ownDamagePolicyExp;
      this.carInsSvc.carInsuranceModal.registrationInfo.thirdPartyExpiryDate = this.ownDamagePolicyExp;
    }else{
      this.ownDamagePolicyExp = '';

      this.carInsSvc.carInsuranceModal.registrationInfo.ownDamageExpiryDate = '';
    }
  }

  yearList: any[] = [];
  monthList: string[] = [];
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  cityList: string[]= [
    'New Delhi',
    'Gudgaon',
    'Pune',
    'Mumbai',
    'Hydrabad',
    'Bangaluru',
    'Kolkata'
  ]

  ngOnInit(): any {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const startYear = currentYear - 15;

    for (let year = currentYear; year >= startYear; year--) {
      this.yearList.push(year);
    }
  }

  showMonths(selectedYear: any): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    this.yearSelected = selectedYear;
    this.insuranceData.registrationInfo.registrationYear = selectedYear;
    console.log('year selected', this.insuranceData.registrationInfo.registrationYear);
  
    if (selectedYear && selectedYear === currentYear) {
      this.monthList = this.months.slice(0, currentMonth + 1);
      // console.log('When selectedYear is equal to current', this.monthList);
    } else if (selectedYear < currentYear) {
      this.monthList = this.months;
      // console.log('When selectedYear is less than current', this.monthList);
    } else {
      this.monthList = [];
    }
  }
  
  onBrandNewCar(flagg: any){
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();
    const currentMonth = new Date(0, currentMonthIndex).toLocaleString('en', {month: 'long'})

    if(flagg){
      this.carInsSvc.carInsuranceModal.registrationInfo.registrationYear = currentYear;
      this.carInsSvc.carInsuranceModal.registrationInfo.registrationMonth = currentMonth;
      this.yearSelected = currentYear;
      this.monthSelected = currentMonth;
    }else{
      this.carInsSvc.carInsuranceModal.registrationInfo.registrationYear = '';
      this.carInsSvc.carInsuranceModal.registrationInfo.registrationMonth = '';
    }
  }

  getMidPoint() {
    return Math.ceil(this.yearList.length / 2);
  }

  getMonth(m: string){
    this.monthSelected = m;
    this.insuranceData.registrationInfo.registrationMonth = m;
  }

  getCity(c:string){
    this.citySelected = c;
    this.insuranceData.registrationInfo.registrationCity = c;
  }

  getThirdPartyExpDate(thirdPartyExp:string){
    this.thirdPartyPolicyExp = thirdPartyExp;
    this.insuranceData.registrationInfo.thirdPartyExpiryDate = thirdPartyExp;
    // console.log('3rd party', thirdPartyExp)
  }

  getOwnDamageExpDate(ownDamageExp:string){
    this.ownDamagePolicyExp = ownDamageExp;
    this.insuranceData.registrationInfo.ownDamageExpiryDate = ownDamageExp;
    // console.log('ownDamage', ownDamageExp)
  }
}
