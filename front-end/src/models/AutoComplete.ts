export interface FetchUniversitiesResponse {
  alpha_two_code: string | null,
  country: string | null,
  domains: string[] | null,
  name: string | null,
  'state-province': string | null,
  web_pages: string[] | null,
}

export const universitySearch: string[] = [];
export const searchCacheType: { [key: string]: typeof universitySearch } = {};