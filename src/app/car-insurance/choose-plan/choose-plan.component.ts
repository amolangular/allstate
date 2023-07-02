import { Component, OnInit } from '@angular/core';
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

    //get selecdtedplan info
    let selectedPlanInfo = this.planInfo.plans.filter((el:any)=> el.planName == plan)[0];
     if(selectedPlanInfo && selectedPlanInfo.contract != null && selectedPlanInfo.contract.coverages.length > 0){
       this.addOnCoverageList = selectedPlanInfo.contract.coverages.filter((obj:any)=> obj.coverType === 'ADDONS');
       console.log("addOn" ,this.addOnCoverageList);
     }
  }

}
