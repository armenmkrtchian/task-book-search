import { Book } from './book.interface';

export interface SearchResponse {
  docs: Book[];
  documentation_url: string;
  numFound: number;
  numFoundExact: boolean;
  num_found: number;
  offset: number | null;
  q: string;
  start: number;
}
