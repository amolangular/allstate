import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { CarInsuranceService } from '../services/car-insurance.service';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.scss'],
})
export class ChoosePlanComponent implements OnInit {
  min!: number;
  max!: number;
  defaultValue!: number;
  value!: number;

  insuranceData: any;
  planInfo: any;
  selectedPlan: string = '';
  addOnCoverageList: any = [];

  constructor(
    private http: HttpService,
    private router: Router,
    private carInsSvc: CarInsuranceService
  ) {
    this.insuranceData = this.carInsSvc.carInsuranceModal;
  }

  ngOnInit(): void {
    this.getEligiblePlan();

    this.carInsSvc.setChoosePlanDetailsCompleted(true);

  }

  getEligiblePlan() {
    this.http
      .getDataFromServer('get-eligible-plan')
      .subscribe((response: any) => {
        if (response instanceof Object) {
          this.planInfo = response;
          this.selectedPlan = response.plans[0].planName;
          this.setPlan(this.selectedPlan);

          //  for Idv

          const idvValues = response.vehicle.vehicleIDV;
          this.max = idvValues.maximumIdv;
          this.min = idvValues.minimumIdv;
          this.defaultValue = idvValues.defaultIdv;
          this.value = idvValues.idv;
          // console.log(this.min, this.max, this.defaultValue, this.value)
        }
        console.log('planInfo', this.planInfo);
      });
  }

  setPlan(plan: string) {
    this.selectedPlan = plan;

    //get selecdtedplan info
    let selectedPlanInfo = this.planInfo.plans.filter(
      (el: any) => el.planName == plan
    )[0];
    if (
      selectedPlanInfo &&
      selectedPlanInfo.contract != null &&
      selectedPlanInfo.contract.coverages.length > 0
    ) {
      let addOnList = selectedPlanInfo.contract.coverages.filter(
        (obj: any) => obj.coverType === 'ADDONS'
      )
      this.addOnCoverageList = JSON.parse(JSON.stringify(addOnList));
      console.log('addOn', this.addOnCoverageList);
    }

    this.setCostDetails(selectedPlanInfo);
  }

  setCostDetails(planObj: any) {
    // Initiating with default value.

    this.insuranceData.selectedPlan.costCoverage.netPremium = 0;
    this.insuranceData.selectedPlan.costCoverage.ownDamagePremium = 0;
    this.insuranceData.selectedPlan.costCoverage.thirdPartyPremium = 0;
    this.insuranceData.selectedPlan.costCoverage.ncbDiscount = 0;
    this.insuranceData.selectedPlan.costCoverage.addOnsPremium = 0;

    // extracting own damage premium.

    let ownDamageCover = planObj.contract.coverages.filter(
      (el: any) => el.coverType === 'OWN_DAMAGE'
    )[0];
    if (ownDamageCover) {
      this.insuranceData.selectedPlan.costCoverage.ownDamagePremium =
        ownDamageCover.netPremium;
      this.insuranceData.selectedPlan.costCoverage.netPremium += Number(
        ownDamageCover.netPremium
      );
      console.log('own Damage', ownDamageCover);
    }

    // Extracting third party premium.

    let thirdParyCover = planObj.contract.coverages.filter(
      (el: any) => el.coverType === 'THIRD_PARTY'
    )[0];
    if (thirdParyCover) {
      this.insuranceData.selectedPlan.costCoverage.thirdPartyPremium =
        thirdParyCover.netPremium;
      this.insuranceData.selectedPlan.costCoverage.netPremium += Number(
        thirdParyCover.netPremium
      );
    }

    // Calculating total Discount.

    if (
      planObj.discounts.otherDiscounts &&
      planObj.discounts.otherDiscounts.length > 0
    ) {
      var totalDiscount = 0;
      totalDiscount = planObj.discounts.otherDiscounts.reduce(
        (accumulator: any, currentVal: any) =>
          accumulator + Number(currentVal.discountAmount),
        0
      );
      if (totalDiscount) {
        this.insuranceData.selectedPlan.costCoverage.ncbDiscount =
          totalDiscount;
        this.insuranceData.selectedPlan.costCoverage.netPremium -=
          totalDiscount;
      }
    }

    this.carInsSvc.sendTotalPremium(this.insuranceData.selectedPlan.costCoverage.netPremium);
  }

  calculateAddOnsCoverage(flag: boolean, indx: any){
    const addOnsPremium = this.addOnCoverageList[0].subCovers[indx].netPremium;

    if(flag){
      this.insuranceData.selectedPlan.costCoverage.addOnsPremium += Number(addOnsPremium);
      this.insuranceData.selectedPlan.costCoverage.netPremium += Number(addOnsPremium);
    }else{
      this.insuranceData.selectedPlan.costCoverage.addOnsPremium -= Number(addOnsPremium);
      this.insuranceData.selectedPlan.costCoverage.netPremium -= Number(addOnsPremium);
    }

    this.carInsSvc.sendTotalPremium(this.insuranceData.selectedPlan.costCoverage.netPremium);
  }

 
}
