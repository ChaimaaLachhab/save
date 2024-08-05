import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Contact} from "../models/contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contacts';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createContact(contact: Contact, user: any): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/client/create`, contact, { headers: this.getHeaders() });
  }

  getAllContacts(user: any): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/admin/all`, { headers: this.getHeaders() });
  }

  getContactById(id: number, user: any): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/admin/find/${id}`, { headers: this.getHeaders() });
  }

  updateContactStatus(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/admin/update/${id}`, contact, { headers: this.getHeaders() });
  }
}
