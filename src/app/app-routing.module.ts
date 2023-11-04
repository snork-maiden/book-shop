import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';
import { BookPageComponent } from './book-page/book-page.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: '',
        component: MainComponent,
      },
      // {
      //   path: '',
      //   component: BookPageComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
