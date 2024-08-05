import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../shared/models/comment.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  fetchComments(userId: string, contractId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}?userId=${userId}&contractId=${contractId}`);
  }
}
