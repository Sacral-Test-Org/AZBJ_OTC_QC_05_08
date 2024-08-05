import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../shared/models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = '/api/account';

  constructor(private http: HttpClient) {}

  lookupIFSCCode(ifscCode: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/ifsc/${ifscCode}`);
  }

  saveAccountDetails(accountDetails: Account): Observable<void> {
    return this.http.post<void>(this.baseUrl, accountDetails);
  }

  fetchBankDetails(ifscCode: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/bank-details/${ifscCode}`);
  }

  checkExistingBankDetails(policyReference: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/${policyReference}`);
  }

  deleteExistingBankDetails(policyReference: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${policyReference}`);
  }

  insertNewBankDetails(account: Account): Observable<void> {
    return this.http.post<void>(this.baseUrl, account);
  }
}
