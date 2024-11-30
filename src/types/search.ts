export type SearchFilters = {
  type: string[];
  department: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  tags: string[];
  visibility: string[];
};

export interface SearchState {
  query: string;
  filters: SearchFilters;
  sortBy: 'date' | 'engagement' | 'impact';
  sortOrder: 'asc' | 'desc';
}