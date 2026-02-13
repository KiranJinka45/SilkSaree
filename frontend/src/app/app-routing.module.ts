import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        loadChildren: () => import('./components/admin-dashboard/admin.module').then(m => m.AdminModule),
        canActivate: [() => inject(AuthService).isAdmin()]
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./components/user-dashboard/user.module').then(m => m.UserModule),
        canActivate: [() => inject(AuthService).isLoggedIn()]
    },
    { path: 'payment', component: PaymentComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
