import { Component } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from '../components/weather-summary/weather-summary.component'; 

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [IonHeader, IonTitle, IonToolbar, IonContent, CommonModule, WeatherComponent], 
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page {}
