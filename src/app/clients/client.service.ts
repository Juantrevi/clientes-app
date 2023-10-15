import { Injectable } from '@angular/core';
// import { CLIENTS } from './clientes.json';
import { Client } from './client';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
//Catching errors is in charge of the catchError operator intercepting it from the backend using the method pipe
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
//To be able to redirect to another page after catching an error or after creating a new client etc...
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';
import { Region } from './detail/region';


//HERE IS WHERE WE HAVE THE BUSINESS LOGIC, BROUGH FROM THE BACKEND TO THE FRONTEND USING THE HTTPCLIENT

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndPoint: string = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient,
              private router: Router) { }


  //Implementing the logic to consume the service from the backend using the HttpClient
  getClients(): Observable<Client[]> {

    /*OTHER WAYS OF DOING IT*
    //This is one way of doing it
    //return this.http.get<Client[]>(this.urlEndPoint);

    //This is another way of doing it using the map method from rxjs
    // return this.http.get(this.urlEndPoint).pipe(map(response => response as Client[]));
    */

    /*SHOWING NAMES IN UPPERCASE AND FORMATTING THE DATES*
    //This is another way of doing it when we want to change something in the flow, like for example putting things in upperor lower case
     */
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let clients = response as Client[];

          return clients.map(client => {
          client.name = client.name.toUpperCase();

          /*One way of changing the format* 
          //client.createdAt = formatDate(client.createdAt, 'dd-MM-yyyy', 'en-US');
          */
          
          /*Another way of changing the format*
          let datePipe = new DatePipe('en-US');
          client.createdAt = datePipe.transform(client.createdAt, 'dd/MM/yyyy');
          */
          
          /*Another way of changing the format to say the day and month*
          let datePipe = new DatePipe('en-US');
          client.createdAt = datePipe.transform(client.createdAt, 'EEE dd, MMM yyyy');
          */

          /**ANOTHER WAY OF FORMATING BUT IN THE HTML */
          
          return client;
          }
        );
      }
    )
  );
}

  getClientsPage(page: number): Observable<any> {

   
  return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
    map((response: any) => {
      (response.content as Client[]).map(client => {
        client.name = client.name.toUpperCase();
        return client;
      });
      return response;
      }));
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
  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.urlEndPoint, client, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.client as Client),
      catchError(e => {
        //This is the way to handle the error brought from the backend
        if (e.status == 400) {
          return throwError(() => e);
        }

        swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e.error.message);
      }
      )
    );
  }

  //Here we are using the map method from rxjs to handle the error brought from the backend and to return the client as a Client object
  update(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlEndPoint}/${client.id}`, client, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.client as Client),
      catchError(e => {
        //This is the way to handle the error brought from the backend

        if (e.status == 400) {
          return throwError(() => e);
        }

        swal.fire(e.error.message, e.error.errors, 'error');
        return throwError(() => e.error.errors);
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

  //Method to upload a photo showing the progress bar
  uploadPhoto(photo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("file", photo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }

  //Method to get the regions
  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regions');
  }

}
