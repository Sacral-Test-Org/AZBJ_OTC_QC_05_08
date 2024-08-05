import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProposalDetails } from '../shared/models/proposal-details.model';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class ProposalDetailsService {
  private apiUrl = 'http://your-backend-api-url/proposal-details';

  constructor(private http: HttpClient, private logger: NGXLogger) {}

  getProposalDetails(): Observable<ProposalDetails> {
    this.logger.debug('Fetching proposal details from API');
    return this.http.get<ProposalDetails>(this.apiUrl);
  }

  generateProposalFormUrl(applicationNumber: string, otherParams: object): Observable<string> {
    this.logger.debug('Generating proposal form URL');
    const url = `${this.apiUrl}/generate-url`;
    return this.http.post<string>(url, { applicationNumber, otherParams });
  }

  getDocuments(applicationNumber: string): Observable<any> {
    this.logger.debug(`Transferring files for application number: ${applicationNumber}`);
    const url = `${this.apiUrl}/transfer-files?applicationNumber=${applicationNumber}`;
    return this.http.get<any>(url);
  }
}
