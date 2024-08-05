import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControlModel } from '../../shared/models/control.model';
import { ControlService } from '../../services/control.service';
import { PartnerTypeService } from '../../services/partner-type.service';
import { PartnerType } from '../../shared/models/partner-type.model';
import { ControlController } from 'Backend/AZBJ_OTC_QC_FMB/my-spring-boot-app/src/main/java/com/example/controller/ControlController.java';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  opusDate: string = '';
  vUser: string = '';
  productId: number = 0;
  contractId: number = 0;
  addressEdited: string = '';
  pcFirstName: string = '';
  pcMiddleName: string = '';
  pcLastName: string = '';
  panStatus: string = '';
  panCardVerification: string = 'Y';
  phNoPanLov: string[] = [];
  panCard: string = '';
  ipPh: string[] = [];
  phNoPanCard: boolean = false;
  rrbBankAccount: boolean = false;
  pcDob: string = '';
  showError: boolean = false;
  errorMessage: string = '';
  panCardNotAvailable: boolean = false;
  panCardOptions: string = '';
  relatedNameFields: string[] = [''];
  partnerTypes: PartnerType[] = [];
  selectedPartnerType: string = '';
  ph_part_id: string = '';
  ph_dob: string = '';
  v_pan_validated: string = '';

  constructor(
    private controlService: ControlService,
    private router: Router,
    private partnerTypeService: PartnerTypeService,
    private controlController: ControlController
  ) {}

  ngOnInit(): void {
    this.partnerTypeService.getPartnerTypes().subscribe({
      next: (partnerTypes) => {
        this.partnerTypes = partnerTypes;
      },
      error: (error) => {
        console.error('Error fetching partner types', error);
      }
    });
  }

  onSaveBankDetails(): void {
    console.log('Bank details saved');
  }

  onValidate(): void {
    this.validatePanCard();
  }

  onExit(): void {
    console.log('Exiting CONTROL section');
  }

  onPrevPolicyDetails(): void {
    console.log('Previous policy PAN details displayed');
  }

  onPanCardStatusChange(status: string): void {
    if (status === 'N') {
      this.showError = true;
    } else {
      this.showError = false;
    }
    this.controlService.updatePanCardStatus(status).subscribe({
      next: (response) => {
        console.log('PAN card status updated successfully');
      },
      error: (error) => {
        console.error('Error updating PAN card status', error);
      }
    });
  }

  onExitButtonClick(): void {
    this.router.navigate(['/']);
  }

  onPH_NO_PAN_LOVChange(event: Event): void {
    try {
      const controlModel: ControlModel = this.getControlModel();
      const phNoPanLovValue = (event.target as HTMLInputElement).value;
      if (controlModel.ph_no_pan_card === 'Y' && !phNoPanLovValue) {
        this.errorMessage = 'Please select one of the LOV for pan card not received flag....';
        this.showError = true;
      } else {
        this.errorMessage = '';
        this.showError = false;
      }
    } catch (error) {
      console.error('Error during PH_NO_PAN_LOV validation', error);
      alert('An error occurred during validation. Please try again.');
    }
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.panCardNotAvailable = checkbox.checked;
    if (this.panCardNotAvailable) {
      this.panCardOptions = '';
      this.clearFields();
    } else {
      this.panCardOptions = '';
    }
  }

  clearFields(): void {
    this.panCard = '';
    this.relatedNameFields = [''];
  }

  validatePartnerType(): void {
    if (!this.selectedPartnerType) {
      this.errorMessage = 'please enter partner';
      this.showError = true;
    } else {
      this.errorMessage = '';
      this.showError = false;
    }
  }

  private getControlModel(): ControlModel {
    return {
      PH_NO_PAN_LOV: this.phNoPanLov,
      ph_no_pan_card: this.panCardVerification,
      panCardNotAvailable: this.panCardNotAvailable,
      panCardOptions: this.panCardOptions,
      panCardNumber: this.panCard,
      relatedNameFields: this.relatedNameFields
    } as ControlModel;
  }

  onPreviousPolicyPanDetailsClick(): void {
    if (this.controlService.parameterListExists('Param1')) {
      this.controlService.destroyParameterList('Param1');
    }
    this.controlService.createParameterList('Param1');
    this.controlService.addParameter('Param1', 'PAR_PH_PART_ID', this.ph_part_id);
    this.controlService.addParameter('Param1', 'PAR_PAN_CARD_NO', this.panCard);
    this.controlService.addParameter('Param1', 'PAR_MODULE', 'BBU');
    this.controlService.addParameter('Param1', 'PAR_PAN_PH_NAME', this.pcFirstName + ' ' + this.pcLastName);
    this.controlService.addParameter('Param1', 'PAR_PAN_PH_DOB', this.ph_dob);
    this.controlService.callForm('AZBJ_OLD_POLICY_DTLS', 'Param1');
    this.v_pan_validated = 'Y';
  }

  onPanCardInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.panCard = input.value.toUpperCase();
    if (this.panCard.length > 15) {
      this.panCard = this.panCard.substring(0, 15);
    }
    this.controlService.fetchPanCardDetails(this.panCard).subscribe({
      next: (control: ControlModel) => {
        this.pcFirstName = control.firstName;
        this.pcMiddleName = control.middleName;
        this.pcLastName = control.surname;
        this.pcDob = control.dob;
        this.checkPreviousPolicies(this.panCard);
      },
      error: (error) => {
        console.error('Error fetching PAN card details', error);
        this.clearFields();
      }
    });
  }

  checkPreviousPolicies(panCard: string): void {
    this.controlService.checkPreviousPolicies(panCard).subscribe({
      next: (exists: boolean) => {
        if (exists) {
          this.errorMessage = 'PAN Card number exists in previous policies.';
          this.showError = true;
          this.enablePreviousPolicyDetailsField();
        } else {
          this.errorMessage = '';
          this.showError = false;
          this.disablePreviousPolicyDetailsField();
        }
      },
      error: (error) => {
        console.error('Error checking previous policies', error);
      }
    });
  }

  enablePreviousPolicyDetailsField(): void {
    // Logic to enable the Previous Policy Details field
  }

  disablePreviousPolicyDetailsField(): void {
    // Logic to disable the Previous Policy Details field
  }

  validatePanCard(): void {
    const panCardNumber = this.panCard;
    const userName = `${this.pcFirstName} ${this.pcMiddleName} ${this.pcLastName}`;
    const dateOfBirth = this.pcDob;

    if (!panCardNumber || panCardNumber.length !== 10) {
      this.errorMessage = 'PAN card number must be 10 characters long.';
      this.showError = true;
      return;
    }

    const panCardRegex = /^[A-Z]{3}[C,P,H,F,A,T,B,L,J,G][A-Z][0-9]{4}[A-Z]$/;
    if (!panCardRegex.test(panCardNumber)) {
      this.errorMessage = 'Invalid PAN card format.';
      this.showError = true;
      return;
    }

    this.controlController.validatePanCardDetails(panCardNumber, userName, dateOfBirth).subscribe({
      next: (validationResult) => {
        if (!validationResult.isValid) {
          this.errorMessage = 'PAN card details do not match.';
          this.showError = true;
          return;
        }

        const age = this.calculateAge(new Date(dateOfBirth));
        if (age < 18) {
          this.errorMessage = 'Age must be 18 or above.';
          this.showError = true;
          return;
        }

        this.errorMessage = '';
        this.showError = false;
        console.log('PAN card details validated successfully');
      },
      error: (error) => {
        console.error('Error validating PAN card details', error);
        this.errorMessage = 'Error validating PAN card details.';
        this.showError = true;
      }
    });
  }

  calculateAge(dob: Date): number {
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }
}
