import { Component, OnInit } from '@angular/core';
import { CarInsuranceService } from '../services/car-insurance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  personalInfoForm!: FormGroup;
  ownershipInfoFilled: boolean = false;

  insuranceData!: any;

  constructor(private carInsSvc: CarInsuranceService, private fb: FormBuilder) {
    this.insuranceData = carInsSvc.carInsuranceModal;

    this.carInsSvc.setPersonalDetailsCompleted(true);
  }

  ngOnInit(): void {
    this.personalInfoFormControls();

    this.calculateTotalPremium();
  }

  calculateTotalPremium() {
    if (this.insuranceData.selectedPlan.costCoverage.netPremium) {
      const gstAmount = Math.floor(
        this.insuranceData.selectedPlan.costCoverage.netPremium * (18 / 100)
      );

      if (gstAmount) {
        this.insuranceData.selectedPlan.costCoverage.gstAmount = gstAmount;

        this.insuranceData.selectedPlan.costCoverage.totalAmount =
          gstAmount + this.insuranceData.selectedPlan.costCoverage.netPremium;

        this.carInsSvc.sendTotalPremium(
          this.insuranceData.selectedPlan.costCoverage.totalAmount
        );
      }

      console.log(gstAmount);
    }
  }

  personalInfoFormControls() {
    this.personalInfoForm = this.fb.group({
      ownerDetails: this.fb.group({
        fullName: ['', [Validators.required]],
        pinCode: ['', [Validators.required]],
        email: ['', [Validators.required]],
        mobileNumber: ['', [Validators.required]],
        updatesViaWhatsapp: [false],
        address: ['', []],
        nomineeName: ['', [Validators.required]],
        nomineeRelationship: ['', [Validators.required]],
      }),
      carDetails: this.fb.group({
        regNumber: ['', []],
        chesisNumber: ['', [Validators.required]],
        engineNumber: ['', []],
        isCarLoanTaken: [false],
        loanProvider: ['', []],
      }),
    });
  }
}
