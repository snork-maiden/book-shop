export interface BookData {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
  amount?: number;
}

export interface BooksList {
  error: string;
  total: string;
  books: Array<BookData>;
}

export interface Cart {
  [ISBN: string]: { amount: number };
}
