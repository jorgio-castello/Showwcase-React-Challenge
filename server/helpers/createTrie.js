const Trie = require('../model/Trie');
const { stringify } = require('flatted');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { UNIVERSITY_FILENAME, UNIVERSITY_JSON_PATH } = require('../config')

const trieDataPath = UNIVERSITY_FILENAME || 'trieData.txt';
const trieJSONPath = UNIVERSITY_JSON_PATH || 'trieData.json';

const trie = new Trie();
fs.readFile(path.join(__dirname, '../data/', trieDataPath), 'utf-8', (err, universityDataStr) => {
  if (err) {
    throw new Error(err);
  }
  // assemble Trie
  const universityData = universityDataStr.split(os.EOL);
  universityData.forEach(university => {
    trie.insert(university[0]);
  });

  // write Trie to json file
  fs.writeFile(path.join(__dirname, '../data/', trieJSONPath), stringify(trie), err => {
    if (err) {
      throw new Error(err);
    }
    console.log('Successfully created Trie and saved it in JSON file');
  });
});