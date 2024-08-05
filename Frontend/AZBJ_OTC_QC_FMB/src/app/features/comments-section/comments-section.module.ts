import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsSectionComponent } from './comments-section.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CommentsSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CommentsSectionComponent
  ]
})
export class CommentsSectionModule {
  static configureModule() {
    // Import CommentsSectionComponent from 'Frontend/AZBJ_OTC_QC_FMB/src/app/features/comments-section/comments-section.component.ts'
    // Declare CommentsSectionComponent in the declarations array.
    // Export CommentsSectionComponent in the exports array.
  }
}