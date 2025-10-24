import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Weather {

  private apiKey = environment.openWeatherKey;
  private apiUrl = environment.openWeatherbaseurl;

  constructor(private http: HttpClient) { }

  // Get weather by coordinates
  getWeatherByCoords(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  // Get weather by city name
  getWeatherByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&units=metric&appid=${this.apiKey}`;
    return this.http.get(url);
  }
  
  // Fetch country by IP address
  getCountryFromIP(): Observable<any> {
    return this.http.get('https://ipapi.co/json/');
  }

  getCities(): Observable<any[]> {
    const citiesUrl = 'https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json';
    return this.http.get<any[]>(citiesUrl);
  }
}
