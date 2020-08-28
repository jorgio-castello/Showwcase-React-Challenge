const UNIVERSITY_FILENAME = process.env.UNIVERSITY_FILENAME || 'trieData.txt';
const UNIVERSITY_JSON_PATH = process.env.UNIVERSITY_JSON_PATH || 'trieData.json';
const PORT = process.env.PORT || 2424;
const UNIVERSITY_SEARCH_URL = 'http://universities.hipolabs.com/search?name=';
module.exports = { PORT, UNIVERSITY_FILENAME, UNIVERSITY_SEARCH_URL, UNIVERSITY_JSON_PATH };