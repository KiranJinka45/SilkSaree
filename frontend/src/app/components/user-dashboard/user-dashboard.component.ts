import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDashboardComponent implements OnInit {
    products: any[] = [];
    allProducts: any[] = [];
    searchQuery = '';

    constructor(
        private productService: ProductService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(search: string = ''): void {
        this.productService.getProducts(0, 100, 'id', search).subscribe(
            (data) => {
                this.products = data.content;
                if (!search) {
                    this.allProducts = data.content;
                }
                this.cdr.markForCheck();
            }
        );
    }

    onSearch(searchTerm: string): void {
        this.searchQuery = searchTerm;
        this.loadProducts(searchTerm);
    }

    trackById(index: number, item: any): number {
        return item.id;
    }
}
