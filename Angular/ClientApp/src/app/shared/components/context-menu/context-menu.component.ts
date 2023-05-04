import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContextMenuService } from './context-menu.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})

export class ContextMenuComponent implements OnInit {

  @Input() manualsVisible: boolean = true;
  @Input() searchVisible: boolean = true;

  manualId: number = 0;
  manuals: any[] = [];

  @Output()
  onManualChange: EventEmitter<any> = new EventEmitter();

  constructor(private service: ContextMenuService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('manualid')){
      this.manualId = Number(this.route.snapshot.queryParamMap.get('manualid'));
    }
    else {
      this.manualId = this.getCachedManualId();
    }
    this.getManuals();
  }

  getCachedManualId() {
    let cachedValue: string = localStorage.getItem('manualId');
    if (cachedValue) {
      return parseInt(cachedValue);
    }
    return 0;
  }

  setCachedManualId(value: string) {
    localStorage.setItem('manualId', value);
  }

  onManualChanged(e: any) {
    this.setCachedManualId(e.value);
    this.onManualChange.emit(e.value);
  }

  getManuals() {
    this.service.getAllManuals().subscribe(response => {
      if (response && response.length > 0) {
        this.manuals = response;
        this.manualId = this.manualId || response[0].id;
        this.onManualChange.emit(this.manualId);
      }
    }, error => {

    });
  }
}
