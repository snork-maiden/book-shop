import { Cart } from "../interfaces";

export class CartService {
  private _cart: Cart = {};

  getState() {
    return this._cart;
  }
  getNumberInCart(isbn: string): number | null {
    const bookInCart = this._cart[isbn];
    if (bookInCart) return bookInCart.amount;
    return null;
  }
  addToCart(isbn: string) {
    let bookInCart = this._cart[isbn];

    if (bookInCart) {
      bookInCart.amount++;
      return;
    }
    this._cart[isbn] = { amount: 1 };
  }
  removeFromCart(isbn: string) {
    const bookInCart = this._cart[isbn];
    if (!bookInCart) {
      return;
    }
    bookInCart.amount--;
    if (bookInCart.amount === 0) {
      delete this._cart[isbn];
    }
  }
}
