import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanDetailsComponent } from './pan-details.component';

@NgModule({
  declarations: [
    PanDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PanDetailsComponent
  ]
})
export class PanDetailsModule {
  configureModule() {
    // Module configuration logic if any
  }
}