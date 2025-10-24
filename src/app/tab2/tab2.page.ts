import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AirQualityComponent } from '../components/air-quality/air-quality.component';

@Component({
  selector: 'app-tab2',
  standalone: true,
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, AirQualityComponent]
})
export class Tab2Page {

  constructor() {}

}
