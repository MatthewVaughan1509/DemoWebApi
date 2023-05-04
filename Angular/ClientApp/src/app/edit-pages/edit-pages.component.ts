import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditPagesService } from './edit-pages.service';
import { Pages } from '../entities/docbook.model';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { PermissionsService } from '../shared/services/permissions.service';
import { WindowService } from '../shared/services/window.service';
import { confirm } from 'devextreme/ui/dialog';

@Component({
  selector: 'app-edit-pages',
  templateUrl: './edit-pages.component.html',
  styleUrls: ['./edit-pages.component.css']
})
export class EditPagesComponent implements OnInit, OnDestroy {

  pages: Pages[] = [];
  toastMessage: string;
  isToastVisible: boolean = false;
  isLoadPanelVisible: boolean = false;

  hasAddPermission: boolean = false;
  hasEditPermission: boolean = false;
  hasDeletePermission: boolean = false;

  title: string = "Edit Pages";
  functionName: string = `DocBook - ${this.title},DocBook - ${this.title},DocBook - ${this.title}`;
  action: string = "Add,Edit,Delete";

  channel: BroadcastChannel;

  constructor(private service: EditPagesService, private notificationService: NotificationService, private permissionsService: PermissionsService, private windowService: WindowService) {
    this.editIconClick = this.editIconClick.bind(this);
  }

  ngOnInit() {
    this.getAllPages();
    this.checkHasPermission();
    this.channel = new BroadcastChannel('app-reload-pages');
    this.channel.addEventListener('message', (event) => {
      if (event.data === "reloadPages") {
        this.getAllPages();
      }
    });
  }

  ngOnDestroy() {
    this.channel.close();
  }

  checkHasPermission() {
    this.permissionsService.hasPermission(this.functionName, this.action).subscribe(haspermission => {
      this.hasAddPermission = haspermission[0];
      this.hasEditPermission = haspermission[1];
      this.hasDeletePermission = haspermission[2];
    });
  }

  getAllPages() {
    this.isLoadPanelVisible = true;
    this.service.getAllPages().subscribe(response => {
      this.pages = response;
      this.isLoadPanelVisible = false;
    }, error => {
      this.notificationService.alert('error', 'Error occurred while loading pages.', error);
      this.isLoadPanelVisible = false;
    });
  }

  onRowRemoving(e) {
    let confirmDeleteMessage: string = e.data && e.data.referencedManuals ? `This page is referenced in the <strong>${e.data.referencedManuals}</strong> manual.<br>Press "Yes" to DELETE this page and also REMOVE it from the referenced manual.` : "Are you sure you want to delete this record?";
    let result = confirm(confirmDeleteMessage, "Warning");
    e.cancel = new Promise((resolve, reject) => {
      result.then((dialogResult) => {
        resolve(!dialogResult);
      });
    });
  }

  editIconClick(e) {
    if (e && e.row && e.row.key) {
      this.windowService.open(`pagedetails?id=${e.row.key}`);
    }
  }

  addIconClick() {
    this.windowService.open('pagedetails');
  }

  onRowRemoved(e: any) {
    let id = e.data.id;
    this.isLoadPanelVisible = true;
    this.service.deletePageAndTags(id).subscribe(x => {
      this.isLoadPanelVisible = false;
      this.reloadPages();
      this.notificationService.alert('success', 'Page deleted successfully!', null);
    }, error => {
      this.isLoadPanelVisible = false;
      this.notificationService.alert('error', 'Error occurred while deleting page.', error);
    });
  }

  reloadPages() {
    const channel = new BroadcastChannel('app-reload-pages');
    channel.postMessage("reloadPages");
  }

  onExporting(data: any) {
    data.fileName = "DocBookAllPages";
  }

  refreshDataGrid() {
    this.getAllPages();
  }
}