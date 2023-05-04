import { Injectable } from '@angular/core';
import { AppSettingsService } from "./app-settings.service";
import { AppSettings } from './app-settings.service';

@Injectable()
export class WindowService {

  appSettings: AppSettings;

  constructor(private appSettingsService: AppSettingsService) {
    this.appSettings = this.appSettingsService.readSettngs();    
  }

  open(url: string) {
    window.open(`${window.location.origin}${this.appSettings.rootDir}${url}`, '_blank');
  }

}
