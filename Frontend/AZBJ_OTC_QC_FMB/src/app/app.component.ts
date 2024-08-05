import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { MatDialog } from '@angular/material/dialog';
import { DocumentUploadComponent } from './features/document-upload/document-upload.component';
import { OfflineUploadComponent } from './features/offline-upload/offline-upload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AZBJ_OTC_QC_FMB';
  testNumber: string = '';

  @ViewChild('proposalNoField') proposalNoField: ElementRef;

  constructor(private http: HttpClient, private logger: NGXLogger, public dialog: MatDialog) {}

  ngOnInit() {
    this.fetchTestNumber();
  }

  fetchTestNumber() {
    this.http.get<{ testNumber: string }>('/api/test-number').subscribe(
      response => {
        this.testNumber = response.testNumber;
        this.logger.info('Test number fetched successfully:', this.testNumber);
      },
      error => {
        this.logger.error('Error fetching test number:', error);
      }
    );
  }

  openUploadForms() {
    this.dialog.open(DocumentUploadComponent);
    this.dialog.open(OfflineUploadComponent);
  }

  focusProposalNoField() {
    if (this.proposalNoField) {
      this.proposalNoField.nativeElement.focus();
    }
  }
}
