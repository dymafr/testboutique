
export type Category = 'gamer' | 'desktop' | 'streaming' | 'all';

export type Filter = 'priceRange' | 'category' | 'search';

export type FilterUpdate = { filterName: 'priceRange', filterValue: [number, number] } | { filterName: 'search', filterValue: string } | { filterName: 'category', filterValue: Category }

export interface FilterInterface {
    priceRange: [number, number],
    category: Category,
    search: string;
}