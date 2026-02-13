import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent implements OnInit {
    products: any[] = [];
    newProduct = { name: '', description: '', price: 0, imageUrl: '' };
    displayedColumns: string[] = ['name', 'description', 'price', 'actions'];

    // Pagination and Search
    totalElements = 0;
    pageSize = 10;
    pageIndex = 0;
    searchQuery = '';

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.getAllProducts();
    }

    getAllProducts() {
        this.productService.getProducts(this.pageIndex, this.pageSize, 'id', this.searchQuery).subscribe(
            (data) => {
                this.products = data.content;
                this.totalElements = data.totalElements;
            }
        );
    }

    onPageChange(event: any) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.getAllProducts();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.searchQuery = filterValue.trim().toLowerCase();
        this.pageIndex = 0;
        this.getAllProducts();
    }

    applyFilterFromNavbar(searchTerm: string) {
        this.searchQuery = searchTerm.trim().toLowerCase();
        this.pageIndex = 0;
        this.getAllProducts();
    }

    isEditing = false;
    currentProductId: number | null = null;

    addProduct() {
        if (this.isEditing && this.currentProductId) {
            this.productService.updateProduct(this.currentProductId, this.newProduct).subscribe(
                () => {
                    this.getAllProducts();
                    this.resetForm();
                }
            );
        } else {
            this.productService.addProduct(this.newProduct).subscribe(
                () => {
                    this.getAllProducts();
                    this.resetForm();
                }
            );
        }
    }

    editProduct(product: any) {
        this.isEditing = true;
        this.currentProductId = product.id;
        this.newProduct = { ...product }; // Create a copy
    }

    cancelEdit() {
        this.resetForm();
    }

    resetForm() {
        this.isEditing = false;
        this.currentProductId = null;
        this.newProduct = { name: '', description: '', price: 0, imageUrl: '' };
    }

    deleteProduct(id: number) {
        this.productService.deleteProduct(id).subscribe(
            () => {
                this.getAllProducts();
            }
        );
    }
}
