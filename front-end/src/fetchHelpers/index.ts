import { FetchUniversitiesResponse } from '../models/AutoComplete';

export const getTrie = (): Promise<string> => {
  const trie: string | null = localStorage.getItem('universityTrie');
  if (trie) {
    return new Promise<string>((resolve) => {
      resolve(trie);
    });
  }
  return fetch('http://127.0.0.1:2424/universityTrie')
    .then(res => res.text())
    .then(trieRaw => {
      localStorage.setItem('universityTrie', trieRaw);
      return trieRaw;
    });
}

export const fetchSearchResults = (query: string): Promise<string[]> => {
  return fetch(`http://universities.hipolabs.com/search?name=${query}`)
    .then(res => res.json())
    .then((universityData: FetchUniversitiesResponse[]) => {
      const universities: { [key: string]: boolean } = {};
      universityData.forEach((uni: FetchUniversitiesResponse) => {
        if (uni && uni.name) {
          universities[uni.name] = true;
        }
      });
      return Object.keys(universities).slice(0, 5);
    })
};