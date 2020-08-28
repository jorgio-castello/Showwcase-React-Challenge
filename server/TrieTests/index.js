const Trie = require('../model/Trie');
const Expect = require('../model/expect');

const testData = { inserted: ['University of Southern California', 'Hack Reactor'], notInserted: ['University of Cambridge', 'University of Oxford'] };

// Initialize models
const trie = new Trie();
const test = new Expect();

// Insert Sample Data
console.log('Assemble Trie');
testData.inserted.forEach(university => {
  console.log(`Inserting ${university} into trie`);
  trie.insert(university);
});
console.log('\n');

// Insertion Tests
console.log('Running tests');
testData.inserted.forEach(university => { // Expect these to return true
  console.log(`Is ${university} in the Trie?`);
  test.isTrue(trie.contains(university), true);
  console.log('\n');
});

testData.notInserted.forEach(university => { // Expect these to return false
  console.log(`Is ${university} in the Trie?`);
  test.isFalse(trie.contains(university), true);
  console.log('\n');
});


// Retrieval Tests
const insertedPrefix = 'Uni';
const university = trie.find(insertedPrefix);
const unInsertedPrefix = 'Col';
const unInsertedUniversity = trie.find(unInsertedPrefix);

console.log(`Found universities with prefix ${insertedPrefix}?`);
console.log(`Is ${insertedPrefix} in the Trie?`);
test.isTrue(university.length, 1); // There should be one entry with that prefix
test.isTrue(university[0], 'University of Southern California');
console.log('\n');
console.log(`Did not find universities with prefix ${unInsertedPrefix}?`);
console.log(`Is ${unInsertedPrefix} in the Trie?`);
test.isTrue(unInsertedUniversity.length, 0);
test.isTrue(unInsertedUniversity[0], undefined);
