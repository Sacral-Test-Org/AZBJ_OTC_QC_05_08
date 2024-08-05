import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchManageRecordsComponent } from './search-manage-records.component';
import { SearchManageRecordsService } from '../../services/search-manage-records.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SearchManageRecordsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    SearchManageRecordsService
  ],
  exports: [
    SearchManageRecordsComponent
  ]
})
export class SearchManageRecordsModule { }