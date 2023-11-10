import { Component, Input, OnInit } from '@angular/core';
import { BookData } from '../interfaces';
import { CartService } from '../services/cart.service';

interface SortParameters {
  byName?: 'asc' | 'desc';
  byPrice?: 'asc' | 'desc';
}
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  @Input({ required: true })
  books!: Array<BookData>;
  @Input() isCart: boolean = false;

  cart: { [ISBN: string]: { amount: number } } = {};
  sortedBooks: Array<BookData> = [];
  filteredBooks: Array<BookData> = [];
  searchString: string = '';
  sortBy: SortParameters | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getState();
    this.sortedBooks = this.books;
    this.filteredBooks = this.books;
  }

  addToCart(isbn: string): void {
    this.cartService.addToCart(isbn);
  }
  removeFromCart(isbn: string): void {
    this.cartService.removeFromCart(isbn);
  }

  searchByString() {
    if (this.searchString?.length === 0) {
      this.filteredBooks = this.books;
      this.sortBooks();
      return;
    }

    const string = this.searchString.toLowerCase();

    this.filteredBooks = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(string) ||
        book.subtitle.toLowerCase().includes(string)
    );
    this.sortBooks();
  }

  setSearchParams(sortingColumn: 'byName' | 'byPrice') {
    if (!this.sortBy) {
      this.sortBy = {
        [sortingColumn]: 'asc',
      };
      this.sortBooks();
      return;
    }

    if (sortingColumn === 'byName') delete this.sortBy.byPrice;
    if (sortingColumn === 'byPrice') delete this.sortBy.byName;

    if (!this.sortBy[sortingColumn]) {
      this.sortBy[sortingColumn] = 'asc';
      this.sortBooks();
      return;
    }
    if (this.sortBy[sortingColumn] === 'asc') {
      this.sortBy[sortingColumn] = 'desc';
      this.sortBooks();
      return;
    }

    delete this.sortBy[sortingColumn];
    if (!Object.keys(this.sortBy).length) {
      this.sortBy === null;
      this.sortBooks();
      return;
    }
  }

  sortBooks() {
    let sortedBooks = [...this.filteredBooks];
    if (this.sortBy === null) {
      this.sortedBooks = sortedBooks;
      return;
    }

    if (this.sortBy.byName) {
      sortedBooks.sort((a, b) => (a.title > b.title ? 1 : -1));

      if (this.sortBy.byName === 'desc') {
        sortedBooks.reverse();
      }
      this.sortedBooks = sortedBooks;
      return;
    }

    sortedBooks.sort((a, b) => {
      const aPrice = +a.price.slice(1);
      const bPrice = +b.price.slice(1);
      return aPrice - bPrice;
    });
    
    if (this.sortBy.byPrice === 'desc') {
      sortedBooks.reverse();
    }
    this.sortedBooks = sortedBooks;
    return;
  }
}
