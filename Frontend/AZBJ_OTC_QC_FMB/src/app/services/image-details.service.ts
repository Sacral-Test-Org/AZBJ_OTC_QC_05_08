import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageDetails } from '../shared/models/image-details.model';

@Injectable({
  providedIn: 'root'
})
export class ImageDetailsService {
  private apiUrl = 'http://your-api-url.com/api/image-details';

  constructor(private http: HttpClient) {}

  getImageDetails(): Observable<ImageDetails> {
    return this.http.get<ImageDetails>(`${this.apiUrl}`);
  }

  logTransferDetails(contract_id: string, appln_no: string, log_message: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/log-transfer`, { contract_id, appln_no, log_message });
  }

  logErrorDetails(contract_id: string, appln_no: string, log_message: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/log-error`, { contract_id, appln_no, log_message });
  }
}
