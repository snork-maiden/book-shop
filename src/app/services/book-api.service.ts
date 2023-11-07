import * as data from '../books.json';
import { BookData, BooksList } from '../interfaces';

export function getBooksList(): Array<BookData> {
  const booksList: BooksList = data;
  if (booksList.total) {
    return booksList.books;
  }
  throw new Error('No books available');
}
