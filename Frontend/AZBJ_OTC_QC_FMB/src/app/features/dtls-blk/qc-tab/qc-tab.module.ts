import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QcTabComponent } from './qc-tab.component';

@NgModule({
  declarations: [
    QcTabComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    QcTabComponent
  ]
})
export class QcTabModule { }
