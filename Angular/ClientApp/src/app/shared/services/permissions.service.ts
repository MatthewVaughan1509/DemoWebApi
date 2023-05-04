import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { AppSettingsService } from "./app-settings.service";

@Injectable()
export class PermissionsService {
    plantDataCoreUrl: string;
    appId: number;

    constructor(private http: HttpClient, private appSettingsService: AppSettingsService) {
        let appSettings = this.appSettingsService.readSettngs();
        this.plantDataCoreUrl = appSettings.plantDataCoreUrl;
        this.appId = appSettings.appid;
    }

    hasPermission(functionName: string, action: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.plantDataCoreUrl}api/Account/HasPermissionForAction/${this.appId}/${functionName}/${action}`)
            .pipe(catchError(this.handleError));
    }

    private handleError(err: any) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            //Client Side Error
            errorMessage = `Error : ${err.error.message}`;
        } else {
            //Server Side Error
            errorMessage = `Message : ${err.message}\nError : ${err.error}`;
        }
        console.log(errorMessage);
        //this is to display error/api exception message to the user
        return throwError(errorMessage);
    }
}
