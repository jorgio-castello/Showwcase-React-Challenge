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