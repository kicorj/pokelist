import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pokemon } from './pokemon';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  // Define API
  apiURL = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getPokemons(offset): Observable<Pokemon> {

    const params = new HttpParams()
    .set('offset', offset);


    return this.http.get<Pokemon>(this.apiURL + '/pokemon', {params})
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getPokemon(name): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.apiURL + '/pokemon/' + name)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

   // Error handling
   handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = error.error.message;
    } else {
      // server-side error
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
