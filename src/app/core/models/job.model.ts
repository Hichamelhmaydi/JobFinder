export interface job {
  id: number;
  name: string;
  type: string;
  publication_date: string;  
  contents: string;          
  locations: { name: string }[];
  categories: { name: string; short_name: string }[];
  levels: { name: string }[];
  refs: { landing_page: string };  
  company: { name: string; id: number };
}
