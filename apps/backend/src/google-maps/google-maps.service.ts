import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class GoogleMapsService {
  private readonly apiKey = process.env.NEST_PUBLIC_GOOGLE_API_KEY;
  private readonly countries = [
    'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia', 'Croatia',
    'Czech Republic', 'Denmark', 'Egypt', 'France', 'Germany', 'Greece', 'Hungary', 'India', 'Ireland', 'Israel',
    'Italy', 'Japan', 'Malaysia', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Poland', 'Portugal', 'Russia',
    'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'United Kingdom', 'United States'
  ];

  constructor(private readonly httpService: HttpService) {}

  private getRandomCountry(): string {
    const randomIndex = Math.floor(Math.random() * this.countries.length);
    return this.countries[randomIndex];
  }

  async fetchPopularDestinations(): Promise<any> {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
    const country = this.getRandomCountry();
    const params = {
      query: `popular tourist attractions in ${country}`,
      key: this.apiKey,
    };

    return this.httpService.get(url, { params }).pipe(
      map((response: AxiosResponse) => response.data),
      catchError(error => {
        console.error('Error fetching popular destinations:', error);
        return throwError(() => new Error('Failed to fetch popular destinations'));
      }),
    ).toPromise();
  }
}