import { Component } from '@angular/core';
import { AppSettings, AppSettingsService } from '../shared/services/app-settings.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent {
  
  appSettings: AppSettings;
  appVersion: string = '';
  stage: string = '';

  constructor(public appSetingsService: AppSettingsService) {
    this.appSettings = this.appSetingsService.readSettngs();
    this.appVersion = `${this.appSettings.build}`;
    this.stage = this.appSettings.stage;
  }
  
}
