import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../shared/models/comment.model';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent implements OnInit {
  commentsForm: FormGroup;
  isTextAreaEnabled: boolean = false;
  contractId: string = 'current_contract_id'; // This should be dynamically set based on the current contract
  userId: string = 'current_user_id'; // This should be dynamically set based on the current user
  comments: Comment[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private commentsService: CommentsService) {
    this.commentsForm = this.fb.group({
      comment: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.commentsForm.get('comment')?.disable();
    this.refreshComments();
  }

  onDoubleClick(): void {
    this.openEditor();
  }

  openEditor(): void {
    const editorWindow = window.open('', 'EDITOR', 'width=300,height=250');
    if (editorWindow) {
      editorWindow.document.write('<textarea id="editor" style="width:100%;height:100%">' + this.commentsForm.get('comment')?.value + '</textarea>');
      const saveButton = editorWindow.document.createElement('button');
      saveButton.textContent = 'Save';
      saveButton.onclick = () => {
        const editedComments = (editorWindow.document.getElementById('editor') as HTMLTextAreaElement).value;
        this.saveComments(editedComments);
        editorWindow.close();
      };
      editorWindow.document.body.appendChild(saveButton);
    }
  }

  saveComments(comments: string): void {
    this.commentsForm.get('comment')?.setValue(comments);
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isTextAreaEnabled = checkbox.checked;
    if (this.isTextAreaEnabled) {
      this.commentsForm.get('comment')?.enable();
    } else {
      this.commentsForm.get('comment')?.disable();
    }
  }

  onAddComments(): void {
    this.captureContractAndUserID();
    this.openCommentsForm();
  }

  captureContractAndUserID(): void {
    // Logic to capture contract ID and user ID
    this.contractId = 'captured_contract_id'; // Replace with actual logic to capture contract ID
    this.userId = 'captured_user_id'; // Replace with actual logic to capture user ID
  }

  openCommentsForm(): void {
    // Logic to open the comments form
    this.router.navigate(['/comments-form']);
  }

  refreshComments(): void {
    this.onRefreshButtonClick();
  }

  handleExitButtonClick(): void {
    this.router.navigate(['/detailed-comments']);
  }

  submitComment(): void {
    if (this.commentsForm.valid) {
      const comment = this.commentsForm.get('comment')?.value;
      this.commentsService.addComment(this.contractId, 'policyNo', comment).subscribe(
        () => {
          this.refreshComments();
        },
        error => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }

  onRefreshButtonClick(): void {
    this.comments = []; // Clear current comments
    this.commentsService.fetchComments(this.userId, this.contractId).subscribe(
      (comments: Comment[]) => {
        this.displayComments(comments);
      },
      error => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  displayComments(comments: Comment[]): void {
    this.comments = comments;
  }
}
