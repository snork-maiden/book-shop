import { Component, OnInit } from '@angular/core';
import { BookData } from '../interfaces';
import { CartService } from '../services/cart.service';
import { getBooksList } from '../services/book-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Array<BookData> = [];

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cart = this.getCart();
  }

  getCart(): Array<BookData> {
    const cartData = this.cartService.getState();
    const books = getBooksList();
    let cartBooks: Array<BookData> = [];

    for (const [isbn, value] of Object.entries(cartData)) {
      let book = books.find((book) => book.isbn13 === isbn);
      if (!book) continue;
      book.amount = value.amount;
      cartBooks.push(book);
    }

    return cartBooks;
  }
}
