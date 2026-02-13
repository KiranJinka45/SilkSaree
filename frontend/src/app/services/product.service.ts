import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = 'http://localhost:8080/api/products';

    constructor(private http: HttpClient) { }

    getProducts(page: number = 0, size: number = 10, sortBy: string = 'id', search: string = ''): Observable<any> {
        let url = `${this.apiUrl}?page=${page}&size=${size}&sortBy=${sortBy}`;
        if (search) {
            url += `&search=${search}`;
        }
        return this.http.get(url).pipe(
            catchError(this.handleError)
        );
    }

    addProduct(product: any): Observable<any> {
        return this.http.post(this.apiUrl, product).pipe(
            catchError(this.handleError)
        );
    }

    deleteProduct(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    updateProduct(id: number, product: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, product).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
