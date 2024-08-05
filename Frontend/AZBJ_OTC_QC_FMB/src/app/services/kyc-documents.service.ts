import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KycDocuments } from '../shared/models/kyc-documents.model';

@Injectable({
  providedIn: 'root'
})
export class KycDocumentsService {
  private apiUrl = 'https://api.example.com/kyc-documents'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  downloadKycDocuments(applicationNumber: string): Observable<KycDocuments> {
    const url = `${this.apiUrl}/download`;
    const body = { applicationNumber };
    return this.http.post<KycDocuments>(url, body);
  }
}
