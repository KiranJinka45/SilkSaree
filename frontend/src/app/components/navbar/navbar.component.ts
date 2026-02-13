import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    searchQuery = '';
    private searchSubject = new Subject<string>();

    @Output() searchEvent = new EventEmitter<string>();

    constructor(public authService: AuthService, private router: Router) {
        // Debounce search input to avoid excessive API calls
        this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(searchTerm => {
            this.searchEvent.emit(searchTerm);
        });
    }

    onSearch() {
        this.searchEvent.emit(this.searchQuery);
    }

    onSearchInput() {
        this.searchSubject.next(this.searchQuery);
    }

    clearSearch() {
        this.searchQuery = '';
        this.searchEvent.emit('');
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
