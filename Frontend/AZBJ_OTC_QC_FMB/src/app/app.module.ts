import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentsSectionModule } from './features/comments-section/comments-section.module';
import { SearchManageRecordsModule } from './features/search-manage-records/search-manage-records.module';
import { AccountDetailsComponent } from './features/account-details/account-details.component';
import { DocumentQualityControlModule } from './features/document-quality-control/document-quality-control.module';
import { PanDetailsModule } from './features/pan-details/pan-details.module';
import { ProposalDetailsModule } from './features/proposal-details/proposal-details.module';
import { QcTabComponent } from './features/dtls-blk/qc-tab/qc-tab.component';
import { QcTabModule } from './features/dtls-blk/qc-tab/qc-tab.module';
import { ControlModule } from './features/control/control.module';
import { ControlComponent } from './features/control/control.component';
import { DeqcDisplayModule } from './features/deqc-display/deqc-display.module';

@NgModule({
  declarations: [
    AppComponent,
    AccountDetailsComponent,
    QcTabComponent,
    ControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommentsSectionModule,
    SearchManageRecordsModule,
    DocumentQualityControlModule,
    PanDetailsModule,
    ProposalDetailsModule,
    QcTabModule,
    ControlModule,
    DeqcDisplayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  static configureModules() {
    // Import the PAN details module
    return {
      imports: [PanDetailsModule]
    };
  }
}