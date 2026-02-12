export interface Job {
  id: number;
  name: string;
  type: string;
  publication_date: string;
  contents: string;
  locations: { name: string }[];
  categories: { name: string; short_name: string }[];
  levels: { name: string }[];
  refs: {
    landing_page: string;
  };
  company: {
    name: string;
    id: number;
  };
}

export interface JobApiResponse {
  page: number;
  page_count: number;
  items_per_page: number;
  total: number;
  results: Job[];
}
