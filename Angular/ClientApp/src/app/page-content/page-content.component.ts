import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDetailService } from '../page-detail/page-detail.service'
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { PermissionsService } from '../shared/services/permissions.service';
import { WindowService } from '../shared/services/window.service';
import { Page, Tag } from '../entities/docbook.model';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.css']
})
export class PageContentComponent implements OnInit {

  @Input() pageId: string;
  @Input() manualId: string;

  page: Page;
  title: string;
  htmlText: any;
  url: string = `${location.origin}/DocBook/`;
  showLinkManualPage: boolean = false;

  pageTags: Tag[] = [];

  isLoadPanelVisible: boolean = false;

  hasEditPermission: boolean = false;

  functionName: string = "DocBook - Page Contents";
  action: string = "Edit";

  constructor(private route: ActivatedRoute, private pageDetailService: PageDetailService, private notificationService: NotificationService, private permissionsService: PermissionsService, private windowService: WindowService) {
    this.edit = this.edit.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pageId = changes.pageId.currentValue;
    this.loadPageDetails();
  }

  ngOnInit() {
    this.checkHasPermission();
    if (this.route.snapshot.queryParamMap.get('pageid')) {
      this.pageId = this.route.snapshot.queryParamMap.get('pageid');
      this.loadPageDetails();
    } else {
      this.route.params.subscribe(params => {
        if (params['pageid']) {
          this.pageId = params['pageid'];
          this.loadPageDetails();
        }
      });
    }
    if (this.manualId) {
      this.showLinkManualPage = true;
    }
  }

  checkHasPermission() {
    this.permissionsService.hasPermission(this.functionName, this.action).subscribe(haspermission => {
      this.hasEditPermission = haspermission;
    });
  }

  loadPageDetails() {
    this.getPageContent();
  }

  getPageContent() {
    if (this.pageId) {
      this.isLoadPanelVisible = true;
      this.page = null;
      this.pageTags = [];
      this.htmlText = '';
      this.title = '';
      this.pageDetailService.getPageAndTags(this.pageId).subscribe(response => {
        this.isLoadPanelVisible = false;
        if (response) {
          this.page = response;
          this.pageTags = response.tags;
          this.htmlText = this.page.htmlText;
          this.title = this.page.name;
        }
      }, error => {
        this.notificationService.alert('error', 'Error occurred while loading page contents.', error);
        this.isLoadPanelVisible = false;
      });
    }
  }

  edit() {
    if (this.pageId) {
      this.windowService.open(`pagedetails?id=${this.pageId}`);
    }
  }

  linkPage() {
    let link = `${this.url}page?pageid=${this.pageId}`;
    this.copyToClipBoard(link);
    this.notificationService.alert('success', 'Link to page content copied to clipboard!', null);
  }

  linkManualPage() {
    let link = `${this.url}manualpage?manualid=${this.manualId}&pageid=${this.pageId}`;
    this.copyToClipBoard(link);
    this.notificationService.alert('success', 'Link to manual & page copied to clipboard!', null);
  }

  copyToClipBoard(text: string) {
    navigator.clipboard.writeText(text).catch(
      function () {
        this.notificationService.alert('error', 'Error copying link to clipboard!', null);
      }
    );
  }
}
