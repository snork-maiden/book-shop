import { Component, OnInit } from '@angular/core';
import { BookData, Cart } from '../interfaces';
import { CartService } from '../services/cart.service';
import { getBooksList } from '../services/book-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Array<BookData> = [];
  cartData: Cart = {};

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartData = this.cartService.getState();
    this.cart = this.getCart();
  }

  getCart(): Array<BookData> {
    const books = getBooksList();
    let cartBooks: Array<BookData> = [];

    for (const [isbn, value] of Object.entries(this.cartData)) {
      let book = books.find((book) => book.isbn13 === isbn);
      if (!book) continue;
      book.amount = value.amount;
      cartBooks.push(book);
    }

    return cartBooks;
  }

  getTotalCart(): string {
    let sum = 0;
    Object.keys(this.cartData).forEach((isbn) => {
      const book = this.cart.find((book) => book.isbn13 === isbn);
      if (typeof book?.price === 'string') {
        sum += +book?.price.slice(1) * this.cartData[isbn].amount;
      }
    });
    return sum.toFixed(2);
  }
}
