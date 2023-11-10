import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookData, Cart } from '../interfaces';
import { getBooksList } from '../services/book-api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
})
export class BookPageComponent implements OnInit {
  isbn: string | null = null;
  book: BookData | null = null;
  is404: boolean = false;
  cart: Cart = {};
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cart = this.cartService.getState();
    this.route.paramMap.subscribe((params) => {
      this.isbn = params.get('isbn') || null;
    });

    this.book = this.findBook(this.isbn);
    this.cart = this.cartService.getState();
  }

  findBook(isbn: string | null): BookData | null {
    if (isbn === null) {
      this.is404 = true;
      return null;
    }
    const books: Array<BookData> = getBooksList();
    const book = books.find((book) => book.isbn13 == isbn);
    if (!book) {
      this.is404 = true;
      return null;
    }
    return book;
  }

  addToCart(isbn: string): void {
    this.cartService.addToCart(isbn);
  }
  removeFromCart(isbn: string): void {
    this.cartService.removeFromCart(isbn);
  }
}
