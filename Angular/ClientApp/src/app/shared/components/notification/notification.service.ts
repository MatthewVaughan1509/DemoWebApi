import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DocBookNotification } from 'src/app/entities/docbook.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _subject = new Subject<DocBookNotification>();

  constructor() { }

  getObservable(): Observable<DocBookNotification> {
    return this._subject.asObservable();
  }

  alert(type: string, message: string, technicalDetails: string) {
    this._subject.next(new DocBookNotification(type, message, technicalDetails));
  }
}
