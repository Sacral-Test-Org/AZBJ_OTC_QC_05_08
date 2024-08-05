import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeqcDisplayComponent } from './deqc-display.component';

@NgModule({
  declarations: [
    DeqcDisplayComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DeqcDisplayComponent
  ]
})
export class DeqcDisplayModule { }
