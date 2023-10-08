import { Injectable } from '@angular/core';
import { CLIENTS } from './clientes.json';
import { Client } from './client';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndPoint: string = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }


  //Implementing the logic to consum the service from the backend using the HttpClient
  getClients(): Observable <Client[]> {
    
    //This is one way of doing it
    return this.http.get<Client[]>(this.urlEndPoint);

    //This is another way of doing it using the map method from rxjs
    // return this.http.get(this.urlEndPoint).pipe(map(response => response as Client[]));
      }

  create(client: Client) : Observable<Client> {
    return this.http.post<Client>(this.urlEndPoint, client, {headers: this.httpHeaders});
  }
}
