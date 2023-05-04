import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { PageDetailService } from './page-detail.service';
import { DxFormComponent } from 'devextreme-angular';
import { PageDetails, Tag } from '../entities/docbook.model';
import { PermissionsService } from '../shared/services/permissions.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.css']
})
export class PageDetailComponent implements OnInit {

  pageId: string;
  formDetails: PageDetails;
  allTags: Tag[] = [];
  toastMessage: string;
  isToastVisible: boolean = false;
  isLoadPanelVisible: boolean = false;
  hasEditPermission: boolean = false;
  toolBarItems: any[] = [];
  isMultiLineToolbar: boolean = true;

  pageTags: any;
  htmlText: any;

  title: string = "Edit Page";
  action: string = "Edit";

  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent

  constructor(private route: ActivatedRoute, private service: PageDetailService, private notificationService: NotificationService, private permissionsService: PermissionsService) {
    this.formDetails = new PageDetails();
  }

  ngOnInit() {
    this.toolBarItems = this.service.getToolbarItemsForHtmlEditor();
    this.loadPage();
  }

  loadPage() {
    this.isLoadPanelVisible = true;
    this.getPage();
    forkJoin([
      this.service.getAllTags(),
      this.permissionsService.hasPermission(`DocBook - ${this.title}`, this.action)
    ]).subscribe(results => {
      if (results && results.length > 0) {
        this.allTags = results[0];
      }
      if (results && results.length > 1) {
        this.hasEditPermission = results[1];
      }
      this.isLoadPanelVisible = false;
    }, error => {
      this.isLoadPanelVisible = false;
      this.notificationService.alert('error', 'Error occurred while fetching page.', error);
    });
  }

  getPage() {
    this.pageId = this.route.snapshot.queryParamMap.get('id');
    if (this.pageId) {
      this.isLoadPanelVisible = true;
      this.service.getPageAndTags(this.pageId).subscribe(response => {
        this.formDetails = response;
        this.isLoadPanelVisible = false;
      }, error => {
        this.notificationService.alert('error', 'Error occurred while loading page and page tags.', error);
        this.isLoadPanelVisible = false;
      });
    }
  }

  updatePage() {
    let result: any = this.form.instance.validate();
    if (result && result.isValid) {
      this.isLoadPanelVisible = true;
      this.service.updatePage(this.formDetails).subscribe(x => {
        this.isLoadPanelVisible = false;
        this.notificationService.alert('success', 'Page updated successfully!', null);
        this.reloadPages();
      }, error => {
        this.isLoadPanelVisible = false;
        this.notificationService.alert('error', 'Error occurred while updating page.', error);
      });
    }
  }

  insertPage() {    
    let result: any = this.form.instance.validate();
    if (result && result.isValid) {
      this.isLoadPanelVisible = true;
      this.service.insertPage(this.formDetails).subscribe(x => {
        this.isLoadPanelVisible = false;
        let entity: PageDetails = x;
        this.pageId = entity.id.toString();
        this.formDetails.id = entity.id;
        this.reloadPages();
        this.notificationService.alert('success', 'Page added successfully!', null);
      }, error => {
        this.isLoadPanelVisible = false;
        this.notificationService.alert('error', 'Error occurred while adding page.', error);
      });
    }
  }

  reloadPages(){
    const channel = new BroadcastChannel('app-reload-pages');
    channel.postMessage("reloadPages");
  }

  onValueChanged(e) {
    this.formDetails.tags = e.value;
  }

  submit(e: any) {    
    if (this.pageId) {
      this.updatePage();
    } else {
      this.insertPage();
    }
    e.preventDefault();
  }

  cancel() {
    window.close();
  }
}
