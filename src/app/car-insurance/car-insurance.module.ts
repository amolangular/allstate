import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarInsuranceRoutingModule } from './car-insurance-routing.module';
import { CarInsuranceComponent } from './car-insurance.component';
import { SelectBrandComponent } from './select-brand/select-brand.component';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModalComponent } from './select-modal/select-modal.component';
import { SelectVariantComponent } from './select-variant/select-variant.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationDetailsComponent } from './registration-details/registration-details.component';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component';
import { CostBrakeupComponent } from './cost-brakeup/cost-brakeup.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    CarInsuranceComponent,
    SelectBrandComponent,
    InsuranceDetailsComponent,
    SelectModalComponent,
    SelectVariantComponent,
    RegistrationDetailsComponent,
    ChoosePlanComponent,
    CostBrakeupComponent,
    PersonalInfoComponent,
    ProgressBarComponent,
  ],
  imports: [
    CommonModule,
    CarInsuranceRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CarInsuranceModule { }
