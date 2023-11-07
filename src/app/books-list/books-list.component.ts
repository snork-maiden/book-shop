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

  cart: object = {};
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cart = this.cartService.getState();
  }
}
