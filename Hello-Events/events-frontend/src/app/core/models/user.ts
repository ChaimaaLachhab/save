import {Reservation} from "./reservation";
import {Role} from "../enums/role.enum";
import {Contact} from "./contact";

export class User {
  id!: number;
  fullName!: string;
  username!: string;
  password!: string;
  email!: string;
  phone!: string;
  role!: Role;
  reservations!: Reservation[];
  contacts!: Contact[];
}
