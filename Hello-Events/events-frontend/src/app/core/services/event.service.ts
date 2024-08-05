import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {EventCategory} from "../enums/event-category.enum";
import {EventClass} from "../models/event-class";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllEvents(): Observable<EventClass[]> {
    return this.http.get<EventClass[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }

  searchEvents(location: string, category: EventCategory, dateTime: Date | null): Observable<EventClass[]> {
    let params = new HttpParams();
    if (location) params = params.set('location', location);
    if (category) params = params.set('category', category);
    if (dateTime) params = params.set('dateTime', dateTime.toISOString());

    return this.http.get<EventClass[]>(`${this.apiUrl}/search`, { headers: this.getHeaders(), params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong, please try again later.'));
  }

  getEventById(id: number): Observable<EventClass> {
    return this.http.get<EventClass>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createEvent(event: EventClass): Observable<EventClass> {
    return this.http.post<EventClass>(`${this.apiUrl}/admin/create`, event, { headers: this.getHeaders() });
  }

  updateEvent(id: number, event: EventClass): Observable<EventClass> {
    return this.http.put<EventClass>(`${this.apiUrl}/admin/update/${id}`, event, { headers: this.getHeaders() });
  }

  deleteEvent(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/admin/delete/${id}`, { headers: this.getHeaders() });
  }
}
