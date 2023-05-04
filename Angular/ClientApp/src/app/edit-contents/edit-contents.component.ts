import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditContentsService } from './edit-contents.service';
import { ManualContents, PageLookup } from '../entities/docbook.model';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { PermissionsService } from '../shared/services/permissions.service';

@Component({
  selector: 'app-edit-contents',
  templateUrl: './edit-contents.component.html',
  styleUrls: ['./edit-contents.component.css']
})
export class EditContentsComponent implements OnInit, OnDestroy {

  contents: ManualContents[] = [];
  pages: PageLookup[] = [];
  toastMessage: string;
  isToastVisible: boolean = false;
  isLoadPanelVisible: boolean = false;
  selectedRowId: number;
  hasAddPermission: boolean = false;
  hasEditPermission: boolean = false;
  hasDeletePermission: boolean = false;

  title: string = "Edit Contents";
  functionName: string = `DocBook - ${this.title},DocBook - ${this.title},DocBook - ${this.title}`;
  action: string = "Add,Edit,Delete";

  manualId: number;

  channel: BroadcastChannel;

  constructor(private service: EditContentsService, private notificationService: NotificationService, private permissionsService: PermissionsService) { }


  ngOnInit() {
    this.loadPermissions();
    this.loadPages();
    this.channel = new BroadcastChannel('app-reload-pages');
    this.channel.addEventListener('message', (event) => {
      if (event.data === "reloadPages") {
        this.loadPages();
      }
    });
  }

  ngOnDestroy() {
    this.channel.close();
  }

  loadPermissions() {
    this.isLoadPanelVisible = true;
    this.permissionsService.hasPermission(this.functionName, this.action).subscribe(results => {
      this.hasAddPermission = results[0];
      this.hasEditPermission = results[1];
      this.hasDeletePermission = results[2];
      this.isLoadPanelVisible = false;
    }, error => {
      this.isLoadPanelVisible = false;
      this.notificationService.alert('error', 'Error loading page permissions.', error);
    });
  }

  loadPages() {
    this.isLoadPanelVisible = true;
    this.service.getAllPagesForLookup().subscribe(result => {
      this.pages = result;
      this.isLoadPanelVisible = false;
    }, error => {
      this.isLoadPanelVisible = false;
      this.notificationService.alert('error', 'Error occurred while loading pages.', error);
    });
  }

  getContents() {
    this.isLoadPanelVisible = true;
    this.service.getById(this.manualId).subscribe(response => {
      this.isLoadPanelVisible = false;
      this.contents = response;
    }, error => {
      this.notificationService.alert('error', 'Error occurred while loading page contents.', error);
      this.isLoadPanelVisible = false;
    });
  }

  onRowInserted(event) {
    this.isLoadPanelVisible = true;
    let manualContent = event.data;
    manualContent.id = 0;
    manualContent.manualId = this.manualId;
    this.service.insertContent(manualContent).subscribe(x => {
      this.isLoadPanelVisible = false;
      this.getContents();
      this.notificationService.alert('success', 'Manual content added successfully!', null);
    }, error => {
      this.isLoadPanelVisible = false;
      this.notificationService.alert('error', 'Error occurred while adding manual content.', error);
    });
  }

  onRowUpdated(event) {
    let content = event.data;
    this.isLoadPanelVisible = true;
    this.service.updateContent(content).subscribe(x => {
      this.isLoadPanelVisible = false;
      this.notificationService.alert('success', 'Manual content updated successfully!', null);
    }, error => {
      this.isLoadPanelVisible = false;
      this.notificationService.alert('error', 'Error occurred while updating manual content.', error);
    });
  }

  onFocusedRowChanged(e) {
    this.selectedRowId = e.row.key;
  }

  onEditorPreparing(e: any) {
    if (e.dataField == "parentId" && e.parentType == "dataRow") {
      let dataSource = this.contents.filter(f => f.id !== this.selectedRowId);
      e.editorOptions.showClearButton = true;
      e.editorOptions.dataSource = dataSource;
    };
  }

  onRowRemoved(e: any) {
    var id = e.data.id;
    this.service.deleteContent(id).subscribe(x => {
      this.isLoadPanelVisible = false;
      this.notificationService.alert('success', 'Manual content deleted successfully!', null);
    }, error => {
      this.isLoadPanelVisible = false;
      this.notificationService.alert('error', 'Error occurred while deleting manual content.', error);
    });
  }

  onManualChange(manualId: number) {
    if (manualId > 0) {
      this.manualId = manualId;
      this.getContents();
    }
  }

  onExporting(data: any) {
    data.fileName = "DocBookManualContents";
  }
}

