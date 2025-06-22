import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserDTO {          // ⬅️ exactamente el JSON que pide el backend
  
  nombre:     string;
  apellido:   string;
  edad:       number;
  countryId:  number;
  stateId:    number;
}

/** Lo que recibes del backend: incluye el id generado */
export interface User extends UserDTO {
  id: number;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly url = 'http://localhost:8082/api/v1/users';

  constructor(private http: HttpClient) {}

  /** POST: crea usuario y devuelve el User completo (con id) */
  add(user: UserDTO): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

 /** GET: devuelve la lista tipada de usuarios */
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }


 /** PUT: actualiza un usuario existente */
  update(id: number, user: UserDTO): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`, user);
  }

  /** DELETE: borra un usuario por id */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }




}
