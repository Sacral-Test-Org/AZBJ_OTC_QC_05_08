import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { KycDocumentsService } from '../../services/kyc-documents.service';
import { KycDocuments } from '../../shared/models/kyc-documents.model';
import { ApplicationService } from '../../services/application.service';
import { ApplicationDetails, ValidationResult, UpdateStatusResult, ActionDetails, LogResult } from '../../shared/models/application.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-dtls-blk',
  templateUrl: './dtls-blk.component.html',
  styleUrls: ['./dtls-blk.component.css']
})
export class DtlsBlkComponent implements OnInit {
  @ViewChild('proposalNoField') proposalNoField: ElementRef;

  constructor(private renderer: Renderer2, private kycDocumentsService: KycDocumentsService, private applicationService: ApplicationService) { }

  ngOnInit(): void {
  }

  focusProposalNoField(): void {
    if (this.proposalNoField && this.proposalNoField.nativeElement) {
      this.renderer.selectRootElement(this.proposalNoField.nativeElement).focus();
    }
  }

  downloadKycDocuments(): void {
    const applicationNumber = this.getApplicationNumber();
    this.kycDocumentsService.downloadKycDocuments(applicationNumber).pipe(
      catchError(error => {
        this.displayErrorMessage('An error occurred while downloading KYC documents.');
        return of(null);
      })
    ).subscribe((response: KycDocuments) => {
      if (response) {
        this.displaySuccessMessage('KYC documents downloaded successfully.');
        this.updateDocumentReceivedStatus();
      }
    });
  }

  onSubmit(): void {
    const applicationNumber = this.getApplicationNumber();
    this.applicationService.fetchApplicationDetails(applicationNumber).pipe(
      catchError(error => {
        this.displayErrorMessage('An error occurred while fetching application details.');
        return of(null);
      })
    ).subscribe((applicationDetails: ApplicationDetails) => {
      if (applicationDetails) {
        if (applicationDetails.receivedFlag === 'N') {
          this.downloadKycDocuments();
        } else {
          this.applicationService.validateDocuments(applicationDetails).pipe(
            catchError(error => {
              this.displayErrorMessage('An error occurred while validating documents.');
              return of(null);
            })
          ).subscribe((validationResult: ValidationResult) => {
            if (validationResult && validationResult.isValid) {
              this.applicationService.updateApplicationStatus(applicationDetails).pipe(
                catchError(error => {
                  this.displayErrorMessage('An error occurred while updating application status.');
                  return of(null);
                })
              ).subscribe((updateStatusResult: UpdateStatusResult) => {
                if (updateStatusResult && updateStatusResult.isUpdated) {
                  this.displaySuccessMessage('Application status updated successfully.');
                  const actionDetails: ActionDetails = this.createActionDetails(applicationDetails);
                  this.applicationService.logAction(actionDetails).pipe(
                    catchError(error => {
                      this.displayErrorMessage('An error occurred while logging the action.');
                      return of(null);
                    })
                  ).subscribe((logResult: LogResult) => {
                    if (logResult && logResult.isLogged) {
                      console.log('Action logged successfully.');
                    }
                  });
                }
              });
            } else {
              this.displayErrorMessage('Validation failed. Please check the required documents.');
            }
          });
        }
      }
    });
  }

  private getApplicationNumber(): string {
    return '123456';
  }

  private displaySuccessMessage(message: string): void {
    alert(message);
  }

  private displayErrorMessage(message: string): void {
    alert(message);
  }

  private updateDocumentReceivedStatus(): void {
    console.log('Document received status updated.');
  }

  private createActionDetails(applicationDetails: ApplicationDetails): ActionDetails {
    return {
      activitySeq: 0,
      effectiveDate: new Date(),
      activityDate: new Date(),
      username: 'user',
      contractId: applicationDetails.contractId,
      polActivityNo: 0,
      policyRef: applicationDetails.proposalNo,
      eventCode: '',
      eventDesc: '',
      comments: '',
      docLink: '',
      requestDate: new Date()
    };
  }
}