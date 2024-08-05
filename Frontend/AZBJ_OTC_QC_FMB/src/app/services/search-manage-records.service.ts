import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchManageRecords } from '../shared/models/search-manage-records.model';

@Injectable({
  providedIn: 'root'
})
export class SearchManageRecordsService {
  private apiUrl = 'http://your-api-url.com'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  searchRecords(searchCriteria: SearchCriteria): Observable<SearchResults> {
    return this.http.post<SearchResults>(`${this.apiUrl}/search-records`, searchCriteria);
  }

  saveState(state: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save-state`, state);
  }

  calculateDateDifference(fromDate: string, toDate: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/api/date-difference`, {
      params: {
        fromDate,
        toDate
      }
    });
  }

  incrementCounter(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/increment-counter`, {});
  }

  updateStatus(status: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/update-status`, { status });
  }

  invokeAZBJComments(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/invoke-azbj-comments`, {});
  }

  getSelectedCases(): Observable<Array<SearchManageRecords>> {
    return this.http.get<Array<SearchManageRecords>>(`${this.apiUrl}/selected-cases`);
  }

  validateCase(caseRecord: SearchManageRecords): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/validate-case`, caseRecord);
  }

  proceedToNextForm(caseRecord: SearchManageRecords): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/proceed-next-form`, caseRecord);
  }

  saveData(records: SearchManageRecords[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/saveRecords`, records);
  }

  searchApplications(searchCriteria: { applicationNumber?: string, partnerType?: string, fromDate?: string, toDate?: string }): Observable<SearchManageRecords[]> {
    let params = new HttpParams();
    if (searchCriteria.applicationNumber) {
      params = params.set('applicationNumber', searchCriteria.applicationNumber);
    }
    if (searchCriteria.partnerType) {
      params = params.set('partnerType', searchCriteria.partnerType);
    }
    if (searchCriteria.fromDate) {
      params = params.set('fromDate', searchCriteria.fromDate);
    }
    if (searchCriteria.toDate) {
      params = params.set('toDate', searchCriteria.toDate);
    }

    return this.http.get<SearchManageRecords[]>(`${this.apiUrl}/search-applications`, { params });
  }

  generateUrl(applicationNumber: string): Observable<string> {
    const url = `${this.apiUrl}/view-docs/${applicationNumber}`;
    return new Observable<string>((observer) => {
      if (applicationNumber) {
        observer.next(url);
        observer.complete();
      } else {
        observer.error('Please check the URL');
      }
    });
  }

  rejectRecords(applicationNumbers: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reject-records`, { applicationNumbers });
  }
}
