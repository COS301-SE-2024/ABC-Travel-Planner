import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class GoogleMapsService {
  private readonly apiKey = process.env.NEST_PUBLIC_GOOGLE_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async fetchPopularDestinations(): Promise<any> {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
    const params = {
      query: 'popular tourist attractions europe',
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
