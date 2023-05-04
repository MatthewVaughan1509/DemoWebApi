import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ManualContents, PageLookup } from '../entities/docbook.model';

@Injectable({
  providedIn: 'root'
})
export class EditContentsService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.baseUrl = baseUrl;
  }

  getAll(): Observable<ManualContents[]> {
    return this.http.get<ManualContents[]>(`${this.baseUrl}ManualContent/getAll`)
      .pipe(catchError(this.handleError));
  }

  getById(id :number): Observable<ManualContents[]> {
    return this.http.get<ManualContents[]>(`${this.baseUrl}ManualContent/GetManualContentByManualId/${id}`)
      .pipe(catchError(this.handleError));
  }

  getAllPagesForLookup(): Observable<PageLookup[]>{
    return this.http.get<PageLookup[]>(`${this.baseUrl}Page/GetAllPagesForLookup`)
    .pipe(catchError(this.handleError));
  }

  insertContent(manualContent: ManualContents) {
    return this.http.post(`${this.baseUrl}ManualContent/Insert`, manualContent)
      .pipe(catchError(err => this.handleError(err)));
  }

  updateContent(manualContent: ManualContents) {
    return this.http.post(`${this.baseUrl}ManualContent/Update`, manualContent).pipe(catchError(err => this.handleError(err)));
  }

  deleteContent(id: number) {
    return this.http.delete(`${this.baseUrl}ManualContent/Delete/${id}`).pipe(catchError(err => this.handleError(err)));
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
