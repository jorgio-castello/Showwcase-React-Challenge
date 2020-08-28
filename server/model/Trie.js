const TrieNode = require('./TrieNode');
class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  insert(university) { // insert a university into Trie
    let node = this.root;
    for (let i = 0; i < university.length; i += 1) {
      let letter = university[i];
      if (node.children[letter] === undefined) {
        node.children[letter] = new TrieNode(letter);
        node.children[letter].parent = node;
      }
      node = node.children[letter];
      if (i === university.length - 1) {
        node.end = true;
      }
    }
  }

  contains(word) {
    let node = this.root;
    for (const char of word) {
      if (node.children[char] === undefined) {
        return false;
      }
      node = node.children[char];
    }
    return node.end;
  }

  find(prefix) { // Method is not helpful server side, but helpful for testing
    const universities = [];
    let node = this.root;
    for (let char of prefix) {
      if (node.children[char]) { // if a character is not in the Trie, this prefix is not present, return []
        node = node.children[char];
      } else {
        return universities;
      }
    }
    // The prefix is in the Trie, proceed to find all possible words based on this prefix
    // universities arr is passed by reference, after possible words have been assembled, return the referenced array
    this.findAllUniversitiesWithPrefix(node, universities);
    return universities;
  }

  findAllUniversitiesWithPrefix(node, universities) {
    if (node.end === true) { // Base case: found the end of a university branch, traverse back up the Trie
      universities.unshift(node.getUniversity());
    }
    for (const letter in node.children) {
      this.findAllUniversitiesWithPrefix(node.children[letter], universities);
    }
  }
}

module.exports = Trie;