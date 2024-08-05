import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProposalDetailsComponent } from './proposal-details.component';

@NgModule({
  declarations: [
    ProposalDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ProposalDetailsComponent
  ]
})
export class ProposalDetailsModule { }
