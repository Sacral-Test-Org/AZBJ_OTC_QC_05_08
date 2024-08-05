import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SearchManageRecordsService } from '../../services/search-manage-records.service';
import { SearchCriteria, SearchResults, SearchManageRecordsModel } from '../../shared/models/search-manage-records.model';
import { PartnerTypeService } from '../../services/partner-type.service';
import { PartnerType } from '../../shared/models/partner-type.model';
import { StatusModel } from '../../shared/models/status.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-manage-records',
  templateUrl: './search-manage-records.component.html',
  styleUrls: ['./search-manage-records.component.css']
})
export class SearchManageRecordsComponent implements OnInit, AfterViewInit {
  searchCriteria: SearchCriteria = {
    startDate: '',
    endDate: '',
    applicationNumber: '',
    partnerType: '',
    status: ''
  };
  searchResults: SearchResults[] = [];
  rejectionReason: string = '';
  isReasonSectionVisible: boolean = false;
  partnerTypes: PartnerType[] = [];
  selectedPartnerType: string = '';
  statusOptions: string[] = [];
  errorMessage: string = '';
  isSearchButtonEnabled: boolean = true;
  reasonLink: string = '';
  statusMessage: string = '';
  counter: number = 0;
  selectedCases: SearchManageRecordsModel[] = [];
  isViewDocsButtonEnabled: boolean = false;

  @ViewChild('reasonInput') reasonInputField!: ElementRef;

  constructor(private searchManageRecordsService: SearchManageRecordsService, private partnerTypeService: PartnerTypeService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.partnerTypeService.getPartnerTypes().subscribe(
      (types: PartnerType[]) => {
        this.partnerTypes = types;
      },
      (error) => {
        console.error('Error fetching partner types', error);
      }
    );

    this.statusOptions = StatusModel.getStatusOptions();
  }

  ngAfterViewInit(): void {
    // Initialize the ViewChild reference for the reason input field.
  }

  onSearch(): void {
    this.searchManageRecordsService.searchRecords(this.searchCriteria).subscribe(
      (results: SearchResults[]) => {
        this.searchResults = results;
      },
      (error) => {
        console.error('Error fetching search results', error);
      }
    );
  }

  onClear(): void {
    this.clearForm();
  }

  clearForm(): void {
    this.searchCriteria = {
      startDate: '',
      endDate: '',
      applicationNumber: '',
      partnerType: '',
      status: ''
    };
    this.searchResults = [];
    this.rejectionReason = '';
    this.selectedPartnerType = '';
    this.errorMessage = '';
    this.isSearchButtonEnabled = true;
    this.reasonLink = '';
    this.statusMessage = '';
    this.counter = 0;
    this.selectedCases = [];
    this.isViewDocsButtonEnabled = false;
  }

  onSave(): void {
    this.onSaveButtonClick();
  }

  onViewDocs(): void {
    this.onViewDocsClick();
  }

  onUploadDocs(): void {
    this.openUploadForms();
  }

  onEdit(): void {
    // Handle the logic to edit the record.
    console.log('QC/Edit clicked');
  }

  onAddComments(): void {
    this.onUwCommentsButtonClick();
  }

  onReject(): void {
    const rejectedApplicationNumbers: string[] = [];
    let rejectedCount = 0;

    for (const record of this.searchResults) {
      if (record.ch === 'Y') {
        rejectedApplicationNumbers.push(record.applicationNumber);
        rejectedCount++;
      }

      if (!record.reasonLink || this.counter === 0) {
        alert('Please enter comments');
        this.isReasonSectionVisible = true;
        setTimeout(() => {
          this.renderer.selectRootElement(this.reasonInputField.nativeElement).focus();
        }, 0);
        return;
      }

      this.searchManageRecordsService.rejectRecords(rejectedApplicationNumbers).subscribe(
        (response) => {
          this.searchManageRecordsService.getContractId(record.applicationNumber).subscribe(
            (contractId: string) => {
              record.contractId = contractId;
              this.searchManageRecordsService.insertComment(contractId, record.reasonLink).subscribe(
                () => {
                  alert(`Number of records rejected: ${rejectedCount}\nRejected Application Numbers: ${rejectedApplicationNumbers.join(', ')}`);
                },
                (error) => {
                  console.error('Error inserting comment', error);
                  alert('Error inserting comment');
                }
              );
            },
            (error) => {
              console.error('Error retrieving contract ID', error);
              alert('Error retrieving contract ID');
            }
          );
        },
        (error) => {
          console.error('Error rejecting records', error);
          alert('Error rejecting records');
        }
      );
    }
  }

  onConfirmAction(): void {
    // Handle the logic to confirm actions.
    console.log('OK clicked');
  }

  onUwCommentsButtonClick(): void {
    this.isReasonSectionVisible = true;
    setTimeout(() => {
      this.renderer.selectRootElement(this.reasonInputField.nativeElement).focus();
    }, 0);
  }

  openUploadForms(): void {
    this.openDocumentUploadForm();
    this.openOfflineUploadForm();
  }

  openDocumentUploadForm(): void {
    // Logic to open the document upload form
    console.log('Document Upload Form opened');
  }

  openOfflineUploadForm(): void {
    // Logic to open the offline upload form
    console.log('Offline Upload Form opened');
  }

  onPartnerTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedPartnerType = selectElement.value;
    this.searchCriteria.partnerType = this.selectedPartnerType;
  }

  onStatusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.searchCriteria.status = selectElement.value;
  }

  validateToDate(fromDate: string, toDate: string): void {
    if (new Date(toDate) < new Date(fromDate)) {
      this.isSearchButtonEnabled = false;
      this.errorMessage = 'To date should be greater than from date';
      return;
    }

    this.searchManageRecordsService.calculateDateDifference(fromDate, toDate).subscribe(
      (monthsDifference: number) => {
        if (monthsDifference >= 6) {
          this.isSearchButtonEnabled = false;
          this.errorMessage = 'Date difference should not be greater than 6 months';
        } else {
          this.isSearchButtonEnabled = true;
          this.errorMessage = '';
        }
      },
      (error) => {
        console.error('Error calculating date difference', error);
      }
    );
  }

  onOkButtonClick(): void {
    if (!this.reasonLink) {
      alert('Please enter comments');
      return;
    }

    this.counter++;
    this.statusMessage = `Counter incremented to ${this.counter}`;

    switch (this.searchCriteria.status) {
      case 'R':
        this.searchCriteria.status = 'REJECT';
        this.hideCurrentView();
        this.navigateTo('REJECT');
        break;
      case 'LS':
        this.searchCriteria.status = 'LINK/SAVE';
        this.hideCurrentView();
        this.navigateTo('LINKSAVE');
        break;
      case 'QC':
        this.searchCriteria.status = 'PROPOSAL_INVOKED';
        this.hideCurrentView();
        this.navigateTo('QC');
        break;
      default:
        this.searchManageRecordsService.invokeAZBJComments();
        break;
    }
  }

  hideCurrentView(): void {
    // Logic to hide the current view
    console.log('Current view hidden');
  }

  navigateTo(field: string): void {
    // Logic to navigate to the specified field
    console.log(`Navigated to ${field}`);
  }

  onQcEditButtonClick(): void {
    this.searchManageRecordsService.getSelectedCases().subscribe(
      (selectedCases: SearchManageRecordsModel[]) => {
        if (selectedCases.length > 1) {
          this.errorMessage = 'Please select only one case.';
          return;
        }

        if (selectedCases.length === 1) {
          const selectedCase = selectedCases[0];
          this.searchManageRecordsService.validateCase(selectedCase).subscribe(
            (isValid: boolean) => {
              if (isValid) {
                this.searchManageRecordsService.proceedToNextForm(selectedCase);
              } else {
                this.errorMessage = 'The selected case does not meet the criteria.';
              }
            },
            (error) => {
              console.error('Error validating case', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching selected cases', error);
      }
    );
  }

  onSaveButtonClick(): void {
    if (!this.validateInputs()) {
      alert('Please provide a reason for linking and ensure the comment count is greater than zero.');
      return;
    }

    this.processRecords();
  }

  validateInputs(): boolean {
    if (!this.reasonLink || this.counter <= 0) {
      return false;
    }
    return true;
  }

  processRecords(): void {
    const recordsToProcess = this.searchResults.filter(record => record.status === 'Y');
    recordsToProcess.forEach(record => {
      this.searchManageRecordsService.getContractId(record.applicationNumber).subscribe(
        (contractId: string) => {
          record.contractId = contractId;
          this.searchManageRecordsService.issuePolicy(contractId).subscribe(
            (response) => {
              alert('Policy issued successfully');
              this.searchManageRecordsService.checkRuleErrors(contractId).subscribe(
                (ruleErrorCount: number) => {
                  if (ruleErrorCount > 0) {
                    alert('Rule validation failed');
                    this.resetForm();
                  } else {
                    this.searchManageRecordsService.checkDocumentReceiptStatus(contractId).subscribe(
                      (documentReceived: boolean) => {
                        if (!documentReceived) {
                          alert('Document receipt status failed');
                          this.resetForm();
                        } else {
                          this.searchManageRecordsService.updatePolicyVersionStatus(contractId).subscribe(
                            () => {
                              this.searchManageRecordsService.updateHubTracker(record.applicationNumber).subscribe(
                                () => {
                                  this.searchManageRecordsService.updateBBUTransaction(record.applicationNumber).subscribe(
                                    () => {
                                      this.searchManageRecordsService.trackHubStatus(record.applicationNumber).subscribe(
                                        () => {
                                          alert('Data saved successfully');
                                          this.resetForm();
                                        },
                                        (error) => {
                                          console.error('Error tracking hub status', error);
                                        }
                                      );
                                    },
                                    (error) => {
                                      console.error('Error updating BBU transaction', error);
                                    }
                                  );
                                },
                                (error) => {
                                  console.error('Error updating hub tracker', error);
                                }
                              );
                            },
                            (error) => {
                              console.error('Error updating policy version status', error);
                            }
                          );
                        }
                      },
                      (error) => {
                        console.error('Error checking document receipt status', error);
                      }
                    );
                  }
                },
                (error) => {
                  console.error('Error checking rule errors', error);
                }
              );
            },
            (error) => {
              console.error('Error issuing policy', error);
            }
          );
        },
        (error) => {
          console.error('Error retrieving contract ID', error);
        }
      );
    });
  }

  resetForm(): void {
    this.clearForm();
  }

  displayResults(records: SearchManageRecords[]): void {
    this.searchResults = records;
  }

  onExitClick(): void {
    window.close();
  }

  onSelectionChange(selectedCases: SearchManageRecordsModel[]): void {
    this.selectedCases = selectedCases;
    this.isViewDocsButtonEnabled = selectedCases.length === 1;
    if (selectedCases.length > 1) {
      this.handleError('For ViewDoc, Please Select only One Case');
    }
  }

  onViewDocsClick(): void {
    if (this.selectedCases.length !== 1) {
      this.handleError('For ViewDoc, Please Select only One Case');
      return;
    }

    const applicationNumber = this.selectedCases[0].applicationNumber;
    this.searchManageRecordsService.generateUrl(applicationNumber).subscribe(
      (url: string) => {
        window.open(url, '_blank');
      },
      (error) => {
        this.handleError('Please check the URL');
      }
    );
  }

  handleError(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }
}
