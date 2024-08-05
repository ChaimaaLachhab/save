import {User} from "./user";
import {ContactStatus} from "../enums/contact-status.enum";

export class Contact {
  id!: number;
  message!: string;
  status!: ContactStatus;
  user!: User;
}
