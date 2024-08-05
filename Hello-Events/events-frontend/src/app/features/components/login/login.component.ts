import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router, RouterOutlet} from "@angular/router";
import {LoginUserDto} from "../../../core/dto/login-user.dto";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    RouterOutlet
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  login() {
    const loginUser: LoginUserDto = new LoginUserDto(this.userName, this.password);
    this.authService.login(loginUser).subscribe({
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
        console.log('Login process complete.');
      }
    });
  }

  openSignUp() {
    this.router.navigate(['/dashboard']);
  }
}
