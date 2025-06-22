import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



export interface Country {
  id:       number;
  nombre:   string;
  // …cualquier otro campo que devuelva tu entidad Country
}



@Injectable({
  providedIn: 'root'
})





export class CountriesService {
  // Ruta del backend que devuelve todos los países
  private readonly APP_SERVER = 'http://localhost:8080/api/v1/countries';

  constructor(private httpClient: HttpClient) {}

  // Método que llama al backend y devuelve todos los países
  public getAllCountries(): Observable<any> {
    return this.httpClient.get(this.APP_SERVER);
  }

  /** Un país por su id */
  public getCountryById(id: number): Observable<Country> {
    return this.httpClient.get<Country>(`${this.APP_SERVER}/${id}`);
  }

  
}
