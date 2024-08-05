import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageDetailsComponent } from './image-details.component';

@NgModule({
  declarations: [
    ImageDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ImageDetailsComponent
  ]
})
export class ImageDetailsModule { }