import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DxLoadPanelModule, DxDataGridModule, DxFormModule, DxResponsiveBoxModule, DxSelectBoxModule, DxButtonModule, DxTagBoxModule, DxHtmlEditorModule, DxTreeListModule, DxTextBoxModule, DxTooltipModule } from 'devextreme-angular';
import { NotificationModule } from './shared/components/notification/notification.component';
import { ContextMenuComponent } from './shared/components/context-menu/context-menu.component';
import { EditContentsComponent } from './edit-contents/edit-contents.component';
import { EditPagesComponent } from './edit-pages/edit-pages.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { AppSettingsService } from './shared/services/app-settings.service';
import { PermissionsService } from './shared/services/permissions.service';
import { WindowService } from './shared/services/window.service';
import { PageContentComponent } from './page-content/page-content.component';
import { TopMenuComponent } from './shared/components/top-menu/top-menu.component';

export function setSettngs(configService: AppSettingsService) {
  return () => configService.setSettngs();
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    EditContentsComponent,
    ContextMenuComponent,
    EditPagesComponent,
    PageDetailComponent,
    PageContentComponent,
    TopMenuComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    DxLoadPanelModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'editcontents', component: EditContentsComponent },
      { path: 'editpages', component: EditPagesComponent },
      { path: 'pagedetails', component: PageDetailComponent },
      { path: 'contents/:pageid', component: PageContentComponent},
      { path: 'manualpage', component: HomeComponent },
      { path: 'page', component: PageContentComponent },
      { path: '**', redirectTo: "home" },
    ]),
    DxDataGridModule,
    DxFormModule,
    DxResponsiveBoxModule,
    DxSelectBoxModule,
    DxTooltipModule,
    DxButtonModule,
    NotificationModule,
    DxTagBoxModule,
    DxHtmlEditorModule,
    DxTreeListModule,
    DxTextBoxModule
  ],
  providers: [
    PermissionsService,
    AppSettingsService,
    WindowService,
    { provide: APP_INITIALIZER, useFactory: setSettngs, deps: [AppSettingsService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
