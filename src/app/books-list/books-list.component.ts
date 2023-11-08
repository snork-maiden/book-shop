import { Component, Input, OnInit } from '@angular/core';
import { BookData } from '../interfaces';
import { CartService } from '../services/cart.service';
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
  searchString: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getState();
    this.sortedBooks = this.books;
  }

  addToCart(isbn: string): void {
    this.cartService.addToCart(isbn);
  }
  removeFromCart(isbn: string): void {
    this.cartService.removeFromCart(isbn);
  }

  searchByString() {
    if (this.searchString?.length === 0) {
      this.sortedBooks = this.books;
      return;
    }
    const string = this.searchString.toLowerCase();
    this.sortedBooks = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(string) ||
        book.subtitle.toLowerCase().includes(string)
    );
  }
}
