import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarInsuranceService } from '../services/car-insurance.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit{

  @Input() progress!: any;

  progressReceived!: Observable<number>;

  constructor(private carInsSvc: CarInsuranceService){}

  ngOnInit(): void {
    this.progressReceived = this.carInsSvc.progressObs$
  }

}
