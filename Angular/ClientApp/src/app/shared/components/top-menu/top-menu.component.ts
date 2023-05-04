import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PermissionsService } from '../../services/permissions.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor(private permissionsService: PermissionsService, private notificationService: NotificationService) { }

  hasEditContentsAddPermission: boolean = false;
  hasEditContentsEditPermission: boolean = false;
  hasEditContentsDeletePermission: boolean = false;
  editContentsfunctionName: string = "DocBook - Edit Contents,DocBook - Edit Contents,DocBook - Edit Contents";

  hasEditPagesAddPermission: boolean = false;
  hasEditPagesEditPermission: boolean = false;
  hasEditPagesDeletePermission: boolean = false;
  editPagesfunctionName: string = "DocBook - Edit Pages,DocBook - Edit Pages,DocBook - Edit Pages";

  showEditContentsLink: boolean = false;
  showEditPagesLink: boolean = false;

  action: string = "Add,Edit,Delete";

  ngOnInit() {
    forkJoin([
      this.permissionsService.hasPermission(this.editContentsfunctionName, this.action),
      this.permissionsService.hasPermission(this.editPagesfunctionName, this.action),
    ]).subscribe(results => {
      if (results){
        if (results.length > 0) {
          this.hasEditContentsAddPermission = results[0][0];
          this.hasEditContentsEditPermission = results[0][1];
          this.hasEditContentsDeletePermission = results[0][2];
          this.showEditContentsLink = this.hasEditContentsAddPermission && this.hasEditContentsEditPermission && this.hasEditContentsDeletePermission;
        }
        if (results.length > 1) {
          this.hasEditPagesAddPermission = results[1][0];
          this.hasEditPagesEditPermission = results[1][1];
          this.hasEditPagesDeletePermission = results[1][2];
          this.showEditPagesLink = this.hasEditPagesAddPermission && this.hasEditPagesEditPermission && this.hasEditPagesDeletePermission;
        }
      }
    }, error => {
      this.notificationService.alert('error', 'Error loading permission.', error);
    });
  }

}
