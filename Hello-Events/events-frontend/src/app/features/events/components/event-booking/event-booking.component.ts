import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EventService} from "../../../../core/services/event.service";
import {Router} from "@angular/router";
import {ReservationService} from "../../../../core/services/reservation.service";
import {Reservation} from "../../../../core/models/reservation";
import {defaultIfEmpty, Observable} from "rxjs";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {AsyncPipe} from "@angular/common";
import {MatTable} from "@angular/material/table";
import {EventClass} from "../../../../core/models/event-class";

@Component({
  selector: 'app-event-booking',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    AsyncPipe,
    MatTable
  ],
  templateUrl: './event-booking.component.html',
  styleUrl: './event-booking.component.scss'
})
export class EventBookingComponent implements OnInit {
  bookingForm!: FormGroup;
  events: EventClass[] = [];
  userTickets: Reservation[] = [];
  bookingConfirmation: { eventName: string; tickets: number } | null = null;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEvents();
    this.loadUserTickets();
  }

  initForm() {
    this.bookingForm = this.fb.group({
      event: ['', Validators.required],
      tickets: [1, [Validators.required, Validators.min(1)]]
    });
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe((data) => {
      this.events = data;
    });
  }

  loadUserTickets(): void {
    const user = this.getUser();
    this.reservationService.getUserTickets(user).pipe(
      defaultIfEmpty([])
    ).subscribe((tickets) => {
      this.userTickets = tickets;
    });
  }

  bookEvent(): void {
    if (this.bookingForm.valid) {
      const { event: eventId, tickets } = this.bookingForm.value;
      const user = this.getUser();

      const event = this.events.find(e => e.id === eventId);
      if (event) {
        this.reservationService.purchaseTicket(eventId, user).subscribe({
          next: (reservation) => {
            this.bookingConfirmation = {
              eventName: event.name,
              tickets
            };
            this.bookingForm.reset();
            this.loadUserTickets();
          },
          error: (err) => {
            console.error('Failed to book event:', err);
          }
        });
      } else {
        console.error('Event not found');
      }
    }
  }

  private getUser(): any {
    return { id: 1 };
  }
}
