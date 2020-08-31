interface TrieNode {
  letter: string,
  parent: TrieNode | null,
  children: { [key: string]: TrieNode },
  end: boolean,
}

class TrieNode {
  constructor(letter: string) {
    this.letter = letter;
    this.parent = null;
    this.children = {};
    this.end = false;
  }

  static getUniversity(this: TrieNode): string {
    let node: TrieNode = this;
    const university: string[] = [];
    while (node.parent !== null) {
      university.unshift(node.letter);
      node = node.parent;
    }
    return university.join('');
  }
}

interface Trie {
  root: TrieNode | null,
}

class Trie {
  constructor() {
    this.root = null;
  }

  static copy(trie: TrieNode): Trie {
    const newTrie = new Trie();
    newTrie.root = trie;
    return newTrie;
  }

  public find(prefix: string): string[] {
    const universities: string[] = [];
    let node: TrieNode | null = this.root;
    if (node) {
      for (const char of prefix) {
        if (node.children[char]) {
          node = node.children[char];
        } else {
          return universities;
        }
      }
      this.findAllUniversities(node, universities);
    }
    return universities.slice(0, 5);
  }

  private findAllUniversities(node: TrieNode, universities: string[]): void {
    if (node.end) {
      universities.unshift(TrieNode.getUniversity.call(node));
    }

    if (universities.length >= 5) return;

    for (const letter in node.children) {
      this.findAllUniversities(node.children[letter], universities);
    }
  }
}

export default Trie;