import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { AccountDetails, BankDetails } from '../../shared/models/account.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accountForm: FormGroup;
  pennyDropStatus: string[] = ['Successful', 'Failed'];
  accountTypes: string[] = ['Savings', 'Current', 'Fixed Deposit', 'Recurring Deposit'];
  relationships: string[] = [
    'Self', 'Spouse', 'Parent', 'Child', 'Sibling', 'Friend', 'Colleague', 'Employer',
    'Employee', 'Partner', 'Relative', 'Neighbor', 'Guardian', 'Trustee', 'Beneficiary',
    'Agent', 'Broker', 'Other'
  ];

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      accountHolderName: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
      branchName: ['', [Validators.required]],
      micrCode: ['', [Validators.required]],
      ifscCode: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
      relationshipWithPremiumPayer: ['', [Validators.required]],
      tppFlag: [false],
      bypassBankDetails: [false],
      pennyDropStatus: ['', [Validators.required]]
    });

    this.accountService.getRelationshipDetails().subscribe((relationships: string[]) => {
      this.relationships = relationships;
    });

    this.handleCheckboxChange();
  }

  convertToUpperCase(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }

  onAccountTypeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.accountForm.patchValue({ accountType: input.value });
  }

  onIFSCCodeBlur(): void {
    const ifscCode = this.accountForm.get('ifscCode').value;
    if (ifscCode) {
      this.accountService.fetchBankDetails(ifscCode).subscribe((bankDetails: BankDetails) => {
        if (bankDetails) {
          this.accountForm.patchValue({
            bankName: bankDetails.bankName,
            branchName: bankDetails.branch,
            micrCode: bankDetails.micrCode
          });
        } else {
          this.openSearchWindow();
        }
      });
    } else {
      this.accountForm.patchValue({
        bankName: '',
        branchName: '',
        micrCode: ''
      });
    }
  }

  openSearchWindow(): void {
    // Logic to open the search window for bank details
    alert('IFSC code not found. Please search for the correct IFSC code.');
  }

  copyBankDetails(): void {
    const bankName = this.accountForm.get('bankName').value;
    const branchName = this.accountForm.get('branchName').value;
    const micrCode = this.accountForm.get('micrCode').value;
    this.accountForm.patchValue({
      bankName,
      branchName,
      micrCode
    });
  }

  submitForm(): void {
    if (this.accountForm.valid) {
      const accountDetails: AccountDetails = this.accountForm.value;
      this.accountService.saveAccountDetails(accountDetails).subscribe(() => {
        alert('Account details saved successfully!');
      });
    }
  }

  onSameBankDtlsClick(): void {
    const accountNumber = this.accountForm.get('accountHolderName').value;
    const ifscCode = this.accountForm.get('ifscCode').value;

    if (accountNumber && ifscCode) {
      this.accountService.getAccountDetails(accountNumber, ifscCode).subscribe((accountDetails: AccountDetails) => {
        this.router.navigate(['/same-bank-details'], { state: { accountDetails } });
      });
    } else {
      alert('Please enter the Account No and IFSC Code.');
    }
  }

  onRelationshipChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.accountForm.patchValue({ relationshipWithPremiumPayer: select.value });
  }

  handleCheckboxChange(): void {
    const bypassBankDetailsControl = this.accountForm.get('bypassBankDetails');
    bypassBankDetailsControl.valueChanges.subscribe((checked: boolean) => {
      const controlsToToggle = [
        'accountHolderName',
        'bankName',
        'branchName',
        'ifscCode',
        'micrCode',
        'relationshipWithPremiumPayer'
      ];

      controlsToToggle.forEach(controlName => {
        const control = this.accountForm.get(controlName);
        if (checked) {
          control.disable();
        } else {
          control.enable();
        }
      });
    });
  }

  saveBankDetails(): void {
    const policyReference = this.accountForm.get('policyReference').value;
    const accountDetails: AccountDetails = this.accountForm.value;

    this.accountService.checkExistingBankDetails(policyReference).subscribe((exists: boolean) => {
      if (exists) {
        this.accountService.deleteExistingBankDetails(policyReference).subscribe(() => {
          this.insertNewBankDetails(accountDetails);
        }, error => {
          alert('Error deleting existing bank details: ' + error.message);
        });
      } else {
        this.insertNewBankDetails(accountDetails);
      }
    }, error => {
      alert('Error checking existing bank details: ' + error.message);
    });
  }

  private insertNewBankDetails(accountDetails: AccountDetails): void {
    this.accountService.insertNewBankDetails(accountDetails).subscribe(() => {
      alert('Bank details saved successfully!');
    }, error => {
      alert('Error saving bank details: ' + error.message);
    });
  }
}
