export type Category = 'gamer' | 'desktop' | 'streaming' | 'all';

export type Filter = 'maxPrice' | 'category' | 'search' | 'minPrice';

export type FilterUpdate = {
  filterName: Filter;
  filterValue: string;
};

export interface FilterInterface {
  maxPrice: string;
  minPrice: string;
  category: string;
  search: string;
}
