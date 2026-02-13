import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment',
    template: `
    <div class="payment-container">
      <mat-card class="payment-card">
        <mat-card-header>
            <mat-card-title>Secure Payment Gateway</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngIf="processing" class="processing">
            <mat-spinner diameter="50"></mat-spinner>
            <p>Processing your payment...</p>
          </div>
          <div *ngIf="!processing" class="success">
            <mat-icon class="success-icon">check_circle</mat-icon>
            <p>Payment Successful!</p>
            <p>Redirecting back to store...</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .payment-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
      background-color: #f5f5f5;
    }
    .payment-card {
      width: 400px;
      padding: 20px;
      text-align: center;
    }
    .processing, .success {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
    .success-icon {
      color: green;
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 10px;
    }
  `]
})
export class PaymentComponent implements OnInit {
    processing = true;

    constructor(private router: Router) { }

    ngOnInit(): void {
        // Simulate payment processing delay
        setTimeout(() => {
            this.processing = false;
            // Redirect back after success
            setTimeout(() => {
                this.router.navigate(['/dashboard']);
            }, 2000);
        }, 3000);
    }
}
