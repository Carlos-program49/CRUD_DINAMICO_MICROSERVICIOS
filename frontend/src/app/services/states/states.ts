import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface State {
  id: number;
  nombre: string;
  countryId: number;
}
@Injectable({ providedIn: 'root' })
export class StatesService {
  /** Endpoint que filtra por país */
  private readonly url = 'http://localhost:8081/api/v1/states/country';

  constructor(private http: HttpClient) {}

  /** Devuelve los estados del país indicado */
  getStatesByCountry(countryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${countryId}`);
  }
}
