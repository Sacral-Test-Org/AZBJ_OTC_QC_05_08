import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentStatus } from '../shared/models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://your-api-url.com/api/documents';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<Array<Document>> {
    return this.http.get<Array<Document>>(this.apiUrl);
  }

  updateDocumentStatus(documentId: number, status: boolean): Observable<any> {
    const url = `${this.apiUrl}/${documentId}/status`;
    return this.http.post(url, { status });
  }

  getDocumentStatus(): Observable<DocumentStatus[]> {
    const url = `${this.apiUrl}/status-options`;
    return this.http.get<DocumentStatus[]>(url);
  }
}