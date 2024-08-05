import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterOutlet} from "@angular/router";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {RegisterUserDto} from "../../../core/dto/register-user.dto";
import {LoginUserDto} from "../../../core/dto/login-user.dto";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet
  ],
  styleUrls: ['./sign.component.scss']
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  fullName: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  register() {
    const registerUser : RegisterUserDto = new RegisterUserDto(this.email, this.password, this.fullName);
    const loginUser:LoginUserDto = new LoginUserDto(this.email, this.password);
    this.authService.signup(registerUser).subscribe(
      {
        next: (response) => {
          console.log('Registration successful:', response);
          this.authService.login(loginUser).subscribe(
            {
              next: (response) => {
                console.log('Login successful:', response);
                localStorage.setItem('token', response.token);
                console.log('Token expires in:', response.expiresIn);

                const token = response.token;
                const decodedToken: any = jwtDecode(token);

                if (decodedToken.role === 'ADMIN') {
                  this.router.navigate(['/dashboard']);
                } else if (decodedToken.role === 'USER') {
                  this.router.navigate(['/home2']);
                } else {
                  console.error('Unknown role:', decodedToken.role);
                }
              },
              error: (err) => {
                console.error('Login failed:', err);
              },
              complete: () => {
                console.log('You are login successfully.');
              }
            }
          );
        },
        error: (err) => {
          console.error('Registration failed:', err);
        },
        complete: () => {
          console.log('Registration process completed.');
        }
      }
    );
  }
}
