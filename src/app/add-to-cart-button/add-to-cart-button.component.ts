import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../interfaces';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.scss'],
})
export class AddToCartButtonComponent implements OnInit {
  @Input({ required: true })
  isbn!: string;

  cart: Cart = {};
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getState();
  }

  addToCart(): void {
    this.cartService.addToCart(this.isbn || '');
  }
  removeFromCart(): void {
    this.cartService.removeFromCart(this.isbn || '');
  }
}
