import { Injectable } from '@angular/core';
import { CLIENTS } from './clientes.json';
import { Client } from './client';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//Catching errors is in charge of the catchError operator intercepting it from the backend using the method pipe
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
//To be able to redirect to another page after catching an error or after creating a new client etc...
import { Router } from '@angular/router';

//HERE IS WHERE WE HAVE THE BUSINESS LOGIC, BROUGH FROM THE BACKEND TO THE FRONTEND USING THE HTTPCLIENT

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndPoint: string = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }


  //Implementing the logic to consum the service from the backend using the HttpClient
  getClients(): Observable<Client[]> {

    //This is one way of doing it
    return this.http.get<Client[]>(this.urlEndPoint);

    //This is another way of doing it using the map method from rxjs
    // return this.http.get(this.urlEndPoint).pipe(map(response => response as Client[]));
  }

  getClient(id): Observable<Client> {

    return this.http.get<Client>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clients']);
        //This is the way to handle the error brought from the backend
        swal.fire('Error retrieving client', e.error.message, 'error');
        return throwError(() => e.error.message);
      })
    );
  }

  //Two ways of doing it, one is this one, the other one is using the map method from rxjs as shown in the update. Remember to change it in the form.component.ts too.
  //Here we returning an observable of any type (Not Client type) because we are not returning a client object, we are returning a json object
  create(client: Client): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, client, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        //This is the way to handle the error brought from the backend
        swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e.error.message);
      }
      )
    );
  }

  //Here we are using the map method from rxjs to handle the error brought from the backend and to return the client as a Client object
  update(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlEndPoint}/${client.id}`, client, { headers: this.httpHeaders }).pipe(
      //This is the way to handle the error brought from the backend
      map((response: any) => response.client as Client),
      catchError(e => {
        swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e.error.message);
      }
      )
    );
  }

  delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        //This is the way to handle the error brought from the backend
        swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e.error.message);
      }
      )
    );
  }
}
