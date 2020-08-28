class TrieNode {
  constructor(letter) {
    this.letter = letter;
    this.parent = null;
    this.children = {};
    this.end = false;
  }

  // This method will be invoked on the "end" node of a university branch
  // Traverse up the branch, enqueueing letters, until arriving at the root
  // Return the letters as a joined string
  getUniversity() {
    const universityLetters = [];
    let node = this;
    while (node.parent !== null) {
      universityLetters.unshift(node.letter);
      node = node.parent;
    }
    return universityLetters.join('');
  }
}