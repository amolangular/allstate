import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { CarInsuranceService } from '../services/car-insurance.service';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.scss']
})
export class ChoosePlanComponent implements OnInit{

  insuranceData:any;
  planInfo:any;
  selectedPlan:string="";
  selectedPlanInfo:any;
  addOnCoverageList:any=[];
  constructor(private http:HttpService,private router:Router,private carInsSvc:CarInsuranceService){
    this.insuranceData = this.carInsSvc.carInsuranceModal ;
  }
 
  ngOnInit(): void {
    this.getEligiblePlan()
  }

  getEligiblePlan(){
    this.http.getDataFromServer("get-eligible-plan").subscribe((response:any)=>{
      if(response instanceof Object){
       this.planInfo = response
       this.selectedPlan = response.plans[0].planName;
       this.setPlan(this.selectedPlan);
      }
      console.log('planInfo',this.planInfo);
    })
  }


  setPlan(plan:string){
    this.selectedPlan = plan ;
    this.insuranceData.selectedPlan.planName = plan ;
    //get selecdtedplan info
   this.selectedPlanInfo = this.planInfo.plans.filter((el:any)=> el.planName == plan)[0];
     if(this.selectedPlanInfo && this.selectedPlanInfo.contract != null && this.selectedPlanInfo.contract.coverages.length > 0){
      let addOnList = this.selectedPlanInfo.contract.coverages.filter((obj:any)=> obj.coverType === 'ADDONS');
      this.addOnCoverageList = JSON.parse(JSON.stringify(addOnList));
       console.log("addOn" ,this.addOnCoverageList);
     }
    
     this.setCostDetails(this.selectedPlanInfo);
  }

  setCostDetails(planObj:any){
   // setting to default value 
  this.insuranceData.selectedPlan.costCoverage.netPremium = 0 ;
  this.insuranceData.selectedPlan.costCoverage.ownDamagePremium = 0 ;
  this.insuranceData.selectedPlan.costCoverage.ncbDiscount = 0 ;
  this.insuranceData.selectedPlan.costCoverage.thirdPartyPremium = 0 ;
  this.insuranceData.selectedPlan.costCoverage.addOnsPremium = 0 ;
  //extracting own damage coverage
   let ownCoverage = planObj.contract.coverages.filter((el:any)=> (el.coverType === "OWN_DAMAGE"))[0];
    if(ownCoverage){
      this.insuranceData.selectedPlan.costCoverage.ownDamagePremium = ownCoverage.netPremium;
      this.insuranceData.selectedPlan.costCoverage.netPremium += Number(ownCoverage.netPremium);
    }

    //extracting thirdparty coverage
    let thirdPartyCoverage = planObj.contract.coverages.filter((el:any)=> (el.coverType === "THIRD_PARTY"))[0];
     if(thirdPartyCoverage){
      this.insuranceData.selectedPlan.costCoverage.thirdPartyPremium = thirdPartyCoverage.netPremium;
      this.insuranceData.selectedPlan.costCoverage.netPremium += Number(thirdPartyCoverage.netPremium);
    }  
     
    //calculating total discounts
    if(planObj.discounts.otherDiscounts && planObj.discounts.otherDiscounts.length > 0){
      var totalDiscount = 0 ;
     totalDiscount = planObj.discounts.otherDiscounts.reduce((acc:any,a2:any)=> (acc + Number(a2.discountAmount)),0);
     if(totalDiscount){
      this.insuranceData.selectedPlan.costCoverage.ncbDiscount = totalDiscount;
      this.insuranceData.selectedPlan.costCoverage.netPremium -= totalDiscount;
     } 
    }

    this.carInsSvc.sendTotalPremium(this.insuranceData.selectedPlan.costCoverage.netPremium);
  }

  caculateAddOnCoverage(flag:boolean,index:number){
    const  netPremium =  this.addOnCoverageList[0]?.subCovers[index].netPremium
    if(flag){
      this.insuranceData.selectedPlan.costCoverage.addOnsPremium += Number(netPremium);
      this.insuranceData.selectedPlan.costCoverage.netPremium += Number(netPremium);;

    }else {
      this.insuranceData.selectedPlan.costCoverage.addOnsPremium -= Number(netPremium);
      this.insuranceData.selectedPlan.costCoverage.netPremium -= Number(netPremium);;
    }
    this.carInsSvc.sendTotalPremium(this.insuranceData.selectedPlan.costCoverage.netPremium);
  }

}
