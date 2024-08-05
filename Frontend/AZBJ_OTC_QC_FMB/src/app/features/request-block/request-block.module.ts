import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestBlockComponent } from './request-block.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RequestBlockComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    RequestBlockComponent
  ]
})
export class RequestBlockModule { }