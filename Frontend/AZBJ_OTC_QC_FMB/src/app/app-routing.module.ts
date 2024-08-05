import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsSectionComponent } from './features/comments-section/comments-section.component';
import { DetailedCommentsComponent } from './features/detailed-comments/detailed-comments.component';
import { SearchManageRecordsComponent } from './features/search-manage-records/search-manage-records.component';
import { AccountDetailsComponent } from './features/account-details/account-details.component';
import { DocumentQualityControlComponent } from './features/document-quality-control/document-quality-control.component';
import { PanDetailsComponent } from './features/pan-details/pan-details.component';
import { ProposalDetailsComponent } from './features/proposal-details/proposal-details.component';
import { QcTabComponent } from './features/dtls-blk/qc-tab/qc-tab.component';
import { ControlComponent } from './features/control/control.component';
import { DeqcDisplayComponent } from './features/deqc-display/deqc-display.component';

const routes: Routes = [
  { path: 'comments', component: CommentsSectionComponent },
  { path: 'detailed-comments', component: DetailedCommentsComponent }, // Route for detailed comments section
  { path: 'search-manage-records', component: SearchManageRecordsComponent }, // Route for search-manage-records component
  { path: 'account-details', component: AccountDetailsComponent }, // Route for account details component
  { path: 'document-quality-control', component: DocumentQualityControlComponent }, // Route for document quality control component
  { path: 'pan-details', component: PanDetailsComponent }, // Route for PAN details component
  { path: 'proposal-details', component: ProposalDetailsComponent }, // Route for proposal details component
  { path: 'qc-tab', component: QcTabComponent }, // Route for QC tab component
  { path: 'control', component: ControlComponent }, // Route for CONTROL section
  { path: 'deqc-display', component: DeqcDisplayComponent }, // Route for DEQC display section
  { path: '', redirectTo: '/search-manage-records', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
