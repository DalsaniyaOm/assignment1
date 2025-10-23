import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Weather } from 'src/app/services/weather';
import { Aqhi, AQHIRecord } from 'src/app/services/aqhi';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule],
  templateUrl: './weather-summary.component.html',
  styleUrls: ['./weather-summary.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  loading = false;
  error = '';
  ontarioData?: AQHIRecord;

  constructor(private weather: Weather, private aqhiService: Aqhi) {}

  ngOnInit(): void {
    this.fetchAverageWeather();
    this.aqhiService.getOntario().subscribe(data => {
      this.ontarioData = data;
    });
  }

  fetchAverageWeather(): void {
    const cities = ['Ottawa,CA', 'Toronto,CA', 'Vancouver,CA', 'Calgary,CA', 'Montreal,CA','Edmonton,CA', 'Halifax,CA', 'Winnipeg,CA', 'Quebec City,CA', 'Victoria,CA'];
    this.loading = true;

    this.weather.getAverageWeather(cities).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
        this.error = '';
      },
      error: (err) => {
        console.error(err);
        this.error = 'Could not fetch weather data';
        this.loading = false;
      }
    });
  }
}
