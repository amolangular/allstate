import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarInsuranceRoutingModule } from './car-insurance-routing.module';
import { CarInsuranceComponent } from './car-insurance.component';
import { SelectBrandComponent } from './select-brand/select-brand.component';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';
import { FormsModule } from '@angular/forms';
import { SelectModalComponent } from './select-modal/select-modal.component';
import { SelectVariantComponent } from './select-variant/select-variant.component';

@NgModule({
  declarations: [
    CarInsuranceComponent,
    SelectBrandComponent,
    InsuranceDetailsComponent,
    SelectModalComponent,
    SelectVariantComponent
  ],
  imports: [
    CommonModule,
    CarInsuranceRoutingModule,
    FormsModule,
  ]
})
export class CarInsuranceModule { }
