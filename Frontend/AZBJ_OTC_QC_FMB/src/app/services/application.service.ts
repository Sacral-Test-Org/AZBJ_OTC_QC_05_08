import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../shared/models/application.model';
import { ApplicationDetails, ValidationResult, UpdateStatusResult, ActionDetails, LogResult } from '../shared/models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://your-backend-api-url';

  constructor(private http: HttpClient) {}

  getApplicationDetails(applicationNumber: string): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/applications/${applicationNumber}`);
  }

  checkAuthorization(userId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/users/${userId}/authorization`);
  }

  fetchApplicationDetails(applicationNumber: number): Observable<ApplicationDetails> {
    return this.http.get<ApplicationDetails>(`${this.apiUrl}/api/application/details?applicationNumber=${applicationNumber}`);
  }

  validateDocuments(applicationDetails: ApplicationDetails): Observable<ValidationResult> {
    return this.http.post<ValidationResult>(`${this.apiUrl}/api/application/validate-documents`, applicationDetails);
  }

  updateApplicationStatus(applicationDetails: ApplicationDetails): Observable<UpdateStatusResult> {
    return this.http.post<UpdateStatusResult>(`${this.apiUrl}/api/application/update-status`, applicationDetails);
  }

  logAction(actionDetails: ActionDetails): Observable<LogResult> {
    return this.http.post<LogResult>(`${this.apiUrl}/api/application/log-action`, actionDetails);
  }
}