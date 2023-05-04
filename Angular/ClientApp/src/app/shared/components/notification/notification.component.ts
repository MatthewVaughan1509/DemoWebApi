import { Component, OnInit, NgModule } from '@angular/core';
import { DocBookNotification, Toaster } from 'src/app/entities/docbook.model';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';
import { DxPopupModule, DxAccordionModule, DxToastModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {

  notification: DocBookNotification;
  private _subscription: Subscription;
  errorDataSource: any = [];
  toaster: Toaster;
  title: string = 'Error';
  showPopup: boolean = false;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this._subscription = this.notificationService.getObservable().subscribe(notification => this.addNotification(notification));
  }

  private addNotification(notification: DocBookNotification) {
    this.notification = notification;
    if (this.notification) {
      if (this.notification.type == 'success') {
        this.toaster = new Toaster('success', 5000, true, this.notification.message);
      } else if (this.notification.type == 'error' || this.notification.type == 'warning') {
        if (this.notification.technicalDetails) {
          this.errorDataSource = [{
            "Id": 1,
            "TechnicalDetails": this.notification.technicalDetails
          }];
        }
        this.title = this.notification.type == 'warning' ? 'Warning' : 'Error';
        this.showPopup = true;
      }
    }
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  onPopupShowing(e: any) {
    if (e.component && e.component.topToolbar()) {
      if (this.notification.type == 'warning') {
        e.component.topToolbar().addClass('warning-title');
      } else {
        e.component.topToolbar().addClass('error-title');
      }
    }
  }

  onPopUpClosing(e: any) {
    this.notification = null;
    this.errorDataSource = [];
    this.showPopup = false;
  }

}

@NgModule({
  imports: [CommonModule, DxPopupModule, DxAccordionModule, DxToastModule],
  declarations: [NotificationComponent],
  exports: [NotificationComponent]
})
export class NotificationModule { }

