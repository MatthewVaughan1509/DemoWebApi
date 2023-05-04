import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service';
import { ManualContents } from '../entities/docbook.model';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { DxTooltipComponent, DxTreeListComponent } from 'devextreme-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: HomeService, private notificationService: NotificationService) { }

  manualContents: ManualContents[] = [];
  manualId: number;
  pageId: number;
  selectedRowKeys: any[];
  expandedRowKeys: any[];
  treeListHeight: number;
  dataSourceitems: any[] = [];

  contentVisible: boolean = false;
  tooltipContent: string = '';

  @ViewChild(DxTreeListComponent, { static: false }) treelist: DxTreeListComponent
  @ViewChild(DxTooltipComponent, { static: false }) tooltip: DxTooltipComponent

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize();
  }

  resize() {
    this.treeListHeight = window.innerHeight - 120;
  }

  ngOnInit(): void {
    this.resize();
    if (this.route.snapshot.queryParamMap.get('manualid') && this.route.snapshot.queryParamMap.get('pageid')) {
      this.manualId = Number(this.route.snapshot.queryParamMap.get('manualid'));
      this.pageId = Number(this.route.snapshot.queryParamMap.get('pageid'));
      this.getManualContentsMenu();
      this.contentVisible = true;
    }
  }

  onManualChange(manualId: number) {
    if (manualId > 0) {
      this.manualId = manualId;
      this.getManualContentsMenu();
    }
  }

  getManualContentsMenu() {
    if (this.manualId) {
      this.contentVisible = false;
      this.service.getManualContents(this.manualId).subscribe(response => {
        this.manualContents = response;
        this.expandedRowKeys = this.manualContents.map(({ parentId }) => parentId);
        if (this.pageId) {
          let selectedPage = this.manualContents.find(item => item.pageId == this.pageId && item.manualId == this.manualId);
          if (selectedPage) {
            this.selectedRowKeys = [selectedPage.id];
            this.contentVisible = true;
            if (this.treelist && this.treelist.instance) {
              let selectedRowKeys: number[] = this.treelist.instance.getSelectedRowKeys();
              if (selectedRowKeys && selectedRowKeys.length > 0) {
                setTimeout(() => { this.treelist.instance.navigateToRow(selectedRowKeys[0]); }, 500);
              }
            }
          }
        }
      }, error => {
        this.notificationService.alert('error', 'Error occurred while loading manual contents.', error);
      });
    }
  }

  onTreeListCellClick(e: any) {
    if (e && e.data && e.data.pageId) {
      this.pageId = e.data.pageId;
      this.contentVisible = true;
    }
  }

  onCellPrepared = (e) => {
    if (e.rowType == "data" && e.column.dataField == "name") {
      e.cellElement.addEventListener("mousemove", (event) => {
        this.tooltipContent = e.data.description;
        this.tooltip.instance.option("target", e.cellElement);
        this.tooltip.instance.show();
      });

      e.cellElement.addEventListener("mouseout", (event) => {
        this.tooltip.instance.hide();
      });
    }
  }

}
