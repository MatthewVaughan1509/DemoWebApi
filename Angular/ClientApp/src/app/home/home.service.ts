import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ManualContents } from '../entities/docbook.model';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getManualContents(id: number): Observable<ManualContents[]>{
    return this.http.get<ManualContents[]>(`${this.baseUrl}ManualContent/GetManualContentByManualId/${id}`)
    .pipe(catchError(this.handleError));
  }


  private handleError(err: any) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      //Client Side Error
      errorMessage = `Error : ${err.error.message}`;
    } else {
      //Server Side Error
      errorMessage = `Message : ${err.message}\nError : ${err.error}`;
    }
    console.log(errorMessage);
    //this is to display error/api exception message to the user
    return throwError(errorMessage);
  }

}
