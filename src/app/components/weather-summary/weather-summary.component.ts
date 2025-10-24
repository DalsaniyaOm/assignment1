import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Weather } from 'src/app/services/weather';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './weather-summary.component.html',
  styleUrls: ['./weather-summary.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  currentCity = '';
  loading = true;
  error = '';
  searchQuery = '';
  allCities: string[] = [];
  filteredCities: string[] = [];
  userCountry = '';
  weatherTheme = 'default-theme';

  constructor(private weatherService: Weather) {}

  async ngOnInit() {
    await this.initializeWeatherApp();
  }

  /** Detect user location and load weather + country-specific cities */
  async initializeWeatherApp() {
    try {
      // Try to get precise coordinates
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      this.fetchWeatherByCoords(latitude, longitude);

      // Also detect country from IP for city list
      this.weatherService.getCountryFromIP().subscribe({
        next: (data: any) => {
          this.userCountry = data.country_code || '';
          if (this.userCountry) this.loadCitiesByCountry(this.userCountry);
        },
        error: () => {
          this.error = 'Could not determine country for city list.';
        }
      });
    } catch {
      // Fallback to IP-based city & country
      this.weatherService.getCountryFromIP().subscribe({
        next: (data: any) => {
          this.currentCity = data.city || 'Your Location';
          this.userCountry = data.country_code || '';
          if (data.city) this.getWeatherForCity(data.city);
          if (this.userCountry) this.loadCitiesByCountry(this.userCountry);
        },
        error: () => {
          this.error = 'Could not determine location or country.';
          this.loading = false;
        }
      });
    }
  }

  /** Fetch weather using coordinates */
  fetchWeatherByCoords(lat: number, lon: number) {
    this.loading = true;
    this.weatherService.getWeatherByCoords(lat, lon).subscribe({
      next: (data: any) => {
        this.weatherData = data.main;
        this.currentCity = data.name;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch weather data.';
        this.loading = false;
      }
    });
  }

  /** Load cities only for the detected country */
  loadCitiesByCountry(countryCode: string) {
    this.weatherService.getCities().subscribe({
      next: (data: any[]) => {
        this.allCities = data
          .filter((city) => city.country === countryCode)
          .map((city) => city.name)
          .filter(Boolean);

        this.filteredCities = this.allCities.slice(0, 50); // show first 50 initially
        console.log(`Loaded ${this.allCities.length} cities for country ${countryCode}`);
      },
      error: () => {
        this.error = 'Failed to fetch cities list.';
      }
    });
  }

  /** Filter city list as user types */
  onSearchChange(event: any) {
    const query = event.detail.value.toLowerCase();
    this.filteredCities = this.allCities
      .filter((city) => city.toLowerCase().includes(query))
      .slice(0, 50);
  }

  /** Fetch weather for selected city */
  getWeatherForCity(city: string) {
    if (!city) return;
    this.loading = true;
    this.error = '';

    this.weatherService.getWeatherByCity(city).subscribe({
      next: (data: any) => {
        this.weatherData = data.main;
        this.currentCity = data.name;
        this.setWeatherTheme(data.weather[0]?.main);
        this.loading = false;
      },
      error: () => {
        this.error = 'City not found.';
        this.loading = false;
      }
    });
  }

  setWeatherTheme(condition: string) {
    if (!condition) {
      this.weatherTheme = 'default-theme';
      return;
    }

    const cond = condition.toLowerCase();
    if (cond.includes('clear')) this.weatherTheme = 'sunny-theme';
    else if (cond.includes('rain') || cond.includes('drizzle') || cond.includes('thunderstorm'))
      this.weatherTheme = 'rainy-theme';
    else if (cond.includes('cloud')) this.weatherTheme = 'cloudy-theme';
    else if (cond.includes('snow')) this.weatherTheme = 'snowy-theme';
    else if (cond.includes('mist') || cond.includes('fog') || cond.includes('haze'))
      this.weatherTheme = 'foggy-theme';
    else this.weatherTheme = 'default-theme';
  }
}
