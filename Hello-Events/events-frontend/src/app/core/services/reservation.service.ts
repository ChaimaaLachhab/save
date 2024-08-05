import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Reservation} from "../models/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  purchaseTicket(eventId: number, user: any): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/client/purchase/${eventId}`, user, { headers: this.getHeaders() });
  }

  getUserTickets(user: any): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/client/all`, { headers: this.getHeaders() });
  }

  getAllPurchases(user: any): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/admin/purchases`, { headers: this.getHeaders() });
  }
}
