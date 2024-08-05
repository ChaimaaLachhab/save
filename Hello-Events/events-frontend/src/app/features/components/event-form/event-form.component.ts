import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { EventCategory } from "../../../core/enums/event-category.enum";
import { MatOption, MatSelect } from "@angular/material/select";
import {NgForOf, TitleCasePipe} from "@angular/common";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import {EventService} from "../../../core/services/event.service";
import {Router} from "@angular/router";
import {EventClass} from "../../../core/models/event-class";

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatSelect,
    MatOption,
    NgForOf,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    TitleCasePipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {
  eventCategories = Object.values(EventCategory);
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private eventService: EventService, private router:Router) {
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      imgCtrl: ['', Validators.required],
      descriptionCtrl: ['', Validators.required],
      categoryCtrl: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      addressCtrl: ['', Validators.required],
      eventDateCtrl: [new Date(), Validators.required],
      priceCtrl: ['', Validators.required],
      availableTickets: ['', Validators.required],
    });
  }

  onNextStep(stepper: any) {
    if (stepper.selectedIndex === 0 && this.firstFormGroup.invalid) {
      alert('Please fill out all required fields in the first step.');
    } else if (stepper.selectedIndex === 1 && this.secondFormGroup.invalid) {
      alert('Please fill out all required fields in the second step.');
    } else {
      stepper.next();
    }
  }

  submitForm(stepper: any) {
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid) {
      alert('Please complete all required fields.');
      return;
    }

    const newEvent: EventClass = {
      name: this.firstFormGroup.value.nameCtrl as string,
      description: this.firstFormGroup.value.descriptionCtrl as string,
      image: this.firstFormGroup.value.imgCtrl as string,
      date: this.secondFormGroup.value.eventDateCtrl as Date,
      location: this.secondFormGroup.value.addressCtrl as string,
      price: this.secondFormGroup.value.priceCtrl as number,
      category: this.firstFormGroup.value.categoryCtrl as EventCategory,
      availableTickets: this.secondFormGroup.value.availableTickets as number,
      reservations: []
    };

    this.eventService.createEvent(newEvent).subscribe({
      next: (response) => {
        alert('Event created successfully!');
        stepper.reset();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Failed to create event. Please try again.');
        console.error('Error creating event:', err);
      },
      complete: () => {
        console.log('You have logged in successfully.');
      }
    });

  }

  protected readonly EventCategory = EventCategory;
}
