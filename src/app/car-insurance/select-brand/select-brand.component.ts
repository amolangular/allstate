import { Component } from '@angular/core';
import { CarInsurance, CarInsuranceService } from '../services/car-insurance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-brand',
  templateUrl: './select-brand.component.html',
  styleUrls: ['./select-brand.component.scss']
})
export class SelectBrandComponent {
  brandList:any = [
    {
      "imgPath":"https://th.bing.com/th/id/R.a8b7d5f7e3eba94c038270e23f725656?rik=bEcZS%2bWHPnRYWw&riu=http%3a%2f%2fwww.carlogos.org%2flogo%2fTata-Group-logo-3840x2160.png&ehk=hgeXoJOSk5BseLq4TpyGVq%2fvJqUT3SQInDY3pMwEIAk%3d&risl=&pid=ImgRaw&r=0",
      "brandName":"TATA"
    },
    {
      "imgPath":"https://th.bing.com/th/id/R.d6a390ffa9f98995799b7561605b427c?rik=erjt7oUVEEDnfg&riu=http%3a%2f%2fwww.carlogos.org%2flogo%2fKia-logo-2560x1440.png&ehk=h2UmfUiGb%2fYfI1wYG%2fHrqdL9J6sD6i9I%2fb217wm%2bjZg%3d&risl=&pid=ImgRaw&r=0",
      "brandName":"KIA"
    },

    {
      "imgPath":"https://th.bing.com/th/id/OIP.pCHNMOCEIbHFpB-IdmAPQQHaHa?pid=ImgDet&rs=1",
      "brandName":"Maruti"
    },

    {
      "imgPath":"https://th.bing.com/th/id/OIP.WjUdnMRzelbbnNCNVzA74gHaEK?pid=ImgDet&rs=1",
      "brandName":"AUDI"
    }

  ]

  insuranceData:any;
  constructor(private carInsService:CarInsuranceService,private router:Router){
     this.insuranceData = this.carInsService.carInsuranceModal;

  }

  selectBrand(name:string){
    this.insuranceData.brandName = name ;
    this.router.navigate(['/car-insurance/select-modal',name]);  

    this.carInsService.setBasicDetailsCompleted(true);
    this.carInsService.updateProgress();
  }
}
