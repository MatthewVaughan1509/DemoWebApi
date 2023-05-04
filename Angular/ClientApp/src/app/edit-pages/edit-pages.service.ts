import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pages } from '../entities/docbook.model';

@Injectable({
  providedIn: 'root'
})
export class EditPagesService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.baseUrl = baseUrl;
  }

  getAllPages(): Observable<Pages[]> {
    return this.http.get<Pages[]>(`${this.baseUrl}Page/GetAllPages`)
    .pipe(catchError(this.handleError));
  }

  deletePageAndTags(id: number) {
    return this.http.delete(`${this.baseUrl}Page/DeletePageAndTags/${id}`).pipe(catchError(err => this.handleError(err)));
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
