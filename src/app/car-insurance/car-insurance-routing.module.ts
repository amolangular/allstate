import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarInsuranceComponent } from './car-insurance.component';
import { SelectBrandComponent } from './select-brand/select-brand.component';
import { SelectModalComponent } from './select-modal/select-modal.component';
import { SelectVariantComponent } from './select-variant/select-variant.component';
import { RegistrationDetailsComponent } from './registration-details/registration-details.component';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component';

const routes: Routes = [
  {
    path: '', component: CarInsuranceComponent, children: [
      { path: '', component: SelectBrandComponent },
      {path:'select-modal/:brandName',component:SelectModalComponent},
      {path:'select-variant/:modelName',component:SelectVariantComponent},
      {path:'registration-details',component:RegistrationDetailsComponent},
      {path:'choose-plan',component:ChoosePlanComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarInsuranceRoutingModule { }
