import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartnerType } from '../shared/models/partner-type.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerTypeService {
  private apiUrl = 'api/partner-types'; // URL to web API

  constructor(private http: HttpClient) { }

  getPartnerTypes(): Observable<PartnerType[]> {
    return this.http.get<PartnerType[]>(this.apiUrl);
  }
}