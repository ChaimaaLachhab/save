import {User} from "./user";
import { Event } from './event';
export class Reservation {
  id!: number;
  event!: Event;
  user!: User;
  purchaseDate!: Date;
}
