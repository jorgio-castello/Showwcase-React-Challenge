const UNIVERSITY_FILENAME = process.env.UNIVERSITY_FILENAME || 'trieData.txt';
const UNIVERSITY_JSON_PATH = process.env.UNIVERSITY_JSON_PATH || 'universityTrie.json';
const UNIVERSITY_SEARCH_URL = 'http://universities.hipolabs.com/search?name=';
module.exports = { UNIVERSITY_FILENAME, UNIVERSITY_SEARCH_URL };