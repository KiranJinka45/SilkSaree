import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    credentials = { username: '', password: '' };
    error = '';

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        this.authService.login(this.credentials).subscribe(
            (response: any) => {
                this.authService.setSession(response);
                if (response.role === 'ADMIN') {
                    this.router.navigate(['/admin']);
                } else {
                    this.router.navigate(['/dashboard']);
                }
            },
            (err) => {
                this.error = 'Invalid username or password';
            }
        );
    }
}
