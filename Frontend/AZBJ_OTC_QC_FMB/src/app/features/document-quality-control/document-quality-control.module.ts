import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentQualityControlComponent } from './document-quality-control.component';

@NgModule({
  declarations: [
    DocumentQualityControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DocumentQualityControlComponent
  ]
})
export class DocumentQualityControlModule {
  configureModule() {
    // Configuration logic if any can be added here
  }
}