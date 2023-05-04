import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppSettingsService {

  private settings: AppSettings;

  constructor(private httpClient: HttpClient) {

  }

  readSettngs(): AppSettings {
    return this.settings;
  }

  setSettngs(): Promise<AppSettings> {
    return this.httpClient
      .get<AppSettings>('config/appsettings.json', {
        headers: new HttpHeaders({
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        })
      })
      .toPromise()
      .then(sett => this.settings = sett);
  }

}

export class AppSettings {
  stage: string;
  build: string;
  plantDataCoreUrl: string;
  appid: number;
  rootDir: string;
}
