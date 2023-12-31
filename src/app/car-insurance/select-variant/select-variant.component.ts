import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { CarInsuranceService } from '../services/car-insurance.service';

@Component({
  selector: 'app-select-variant',
  templateUrl: './select-variant.component.html',
  styleUrls: ['./select-variant.component.scss']
})
export class SelectVariantComponent implements OnInit {
  selectedModel: string | null = null;
  variantTypes: string[] = [];
  variantList: any[] = [];
  insuranceData: any;
  selectedVariant: string = "";
  constructor(private activatedRoute: ActivatedRoute, private http: HttpService, private carInsSvc: CarInsuranceService,private router:Router) {
    this.selectedModel = this.activatedRoute.snapshot.paramMap.get('modelName');
    this.insuranceData = this.carInsSvc.carInsuranceModal;
  }

  ngOnInit(): void {
   
    this.getVariantList();
  }

  getVariantList() {
    if (this.selectedModel) {
      const endPoint = "get-variant?" + "modelName=" + this.selectedModel;
      this.http.getDataFromServer(endPoint).subscribe((response: any) => {
        if (response && response.length > 0 && response[0].modelList.length > 0) {
          const variants: string[] = response[0].modelList.map((el: any) => el["Fuel Type"]);
          console.log("list")
          this.variantTypes = [...new Set(variants)];
          this.selectedVariant = this.variantTypes[0];
          this.variantList = response[0].modelList;
          
        }
      })
    }
  }

  setVariantType(type: string) {
    this.selectedVariant = type
  }

  setVariantName(obj:any){
    this.insuranceData.variantName = obj["Variant Name"];
    this.router.navigate(['/car-insurance/registration-details']);
  }

}
