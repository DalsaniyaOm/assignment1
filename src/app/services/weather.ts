import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Weather {

  private apiKey = environment.openWeatherKey;
  private apiUrl = environment.openWeatherbaseurl;

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    const endpoint = 'weather';
    const url = `${this.apiUrl}${endpoint}?q=${city}&units=metric&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  getAverageWeather(cities: string[]): Observable<any> {
    const requests = cities.map(city => this.getWeather(city));

    return forkJoin(requests).pipe(
      map((responses: any[]) => {
        let totalTemp = 0;
        let totalHumidity = 0;

        responses.forEach((res: any) => {
          totalTemp += res.main.temp;
          totalHumidity += res.main.humidity;
        });

        const count = responses.length;
        return {
          cities: responses.map(r => r.name),
          averageTemp: (totalTemp / count).toFixed(2),
          averageHumidity: (totalHumidity / count).toFixed(2),
          rawData: responses
        };
      })
    );
  }
}
