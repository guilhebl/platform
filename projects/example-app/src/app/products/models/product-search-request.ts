export interface ProductSearchRequest {
  query: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  pageSize: number;
}

export function generateMockProductSearchRequest(): ProductSearchRequest {
  return {
    query: '',
    sortBy: '',
    sortOrder: 'asc',
    page: 1,
    pageSize: 10,
  };
}
