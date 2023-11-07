import { Component, OnInit } from '@angular/core';
import { BookData } from '../interfaces';
import { getBooksList } from '../services/book-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  books: Array<BookData> = [];
  ngOnInit(): void {
    this.books = getBooksList()
  }

}
