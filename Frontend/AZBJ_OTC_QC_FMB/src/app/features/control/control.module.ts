import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlComponent } from './control.component';
import { ControlModel } from '../../shared/models/control.model';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoggerModule } from 'ngx-logger';

@NgModule({
  declarations: [
    ControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxLoggerModule.forRoot({ level: 'DEBUG' })
  ],
  exports: [
    ControlComponent
  ],
  providers: [
    ControlModel
  ]
})
export class ControlModule {
  // Ensure the module is correctly set up to include the new functionality for PAN Card validation and details display
}
