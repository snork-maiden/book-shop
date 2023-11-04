import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookPageComponent } from './book-page/book-page.component';
import { MainComponent } from './main/main.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    BooksListComponent,
    BookPageComponent,
    MainComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
