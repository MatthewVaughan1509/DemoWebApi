import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageDetails, Tag } from '../entities/docbook.model';

@Injectable({
  providedIn: 'root'
})
export class PageDetailService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.baseUrl = baseUrl;
  }

  getPageAndTags(id: string): Observable<PageDetails> {
    return this.http.get<PageDetails>(`${this.baseUrl}Page/GetPageAndTagsByPageId/${id}`)
    .pipe(catchError(this.handleError));
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.baseUrl}Tag/GetAll`)
    .pipe(catchError(this.handleError));
  }

  updatePage(pageTags: PageDetails) {
    return this.http.post(`${this.baseUrl}Page/UpdatePageAndTags`, pageTags).pipe(catchError(err => this.handleError(err)));
  }

  insertPage(pageTags: PageDetails): Observable<PageDetails> {
    return this.http.post<PageDetails>(`${this.baseUrl}Page/InsertPageAndTags`, pageTags).pipe(catchError(err => this.handleError(err)));
  }

  getToolbarItemsForHtmlEditor() {
    return [ "background","bold","color"
    ,{ name: "font", acceptedValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana']} 
    ,{ name: "size", acceptedValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'] }
    ,"italic","link","image","strike","subscript","superscript","underline","blockquote","header","increaseIndent","decreaseIndent","orderedList","bulletList","alignLeft","alignCenter","alignRight","alignJustify","codeBlock","variable","separator","undo","redo","clear","cellProperties","tableProperties","insertTable","insertHeaderRow","insertRowAbove","insertRowBelow","insertColumnLeft","insertColumnRight","deleteColumn","deleteRow","deleteTable"];
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
