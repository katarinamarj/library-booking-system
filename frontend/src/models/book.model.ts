export interface BookSearchResponse {
  kind: string;
  totalItems: number;
  items: BookModel[];
}

export interface BookModel {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    language?: string;
    pageCount?: number;
    categories?: string[];
  };
}
