const alphabet = require('../model/alphabet');
const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs');
const os = require('os');
const { UNIVERSITY_FILENAME, UNIVERSITY_SEARCH_URL } = require('../config');

const UNIVERSITY_OUTPUT_FILEPATH = path.join(__dirname, `../data/${UNIVERSITY_FILENAME}`);

async function fetchUniversities(letter) {
  return fetch(`${UNIVERSITY_SEARCH_URL}${letter}&country=United%20States`).then(res => res.json());
}

const init = (universityObj, idx, callback) => {
  if (idx === alphabet.length) {
    callback(universityObj);
    return;
  }
  const letter = alphabet[idx];
  console.log(`Fetching results for ${letter}`);
  fetchUniversities(letter)
    .then(data => {
      data.map(university => universityObj[university.name] = true);
      init(universityObj, idx + 1, callback);
    });
}

// UniversityObj, alphabet start idx, callback to write data to file
init({}, 0, (universityData) => {
  let universities = Object.keys(universityData); // raw data as an arr
  universities = universities.join(os.EOL); // package the universities as a string, delimited by operating system end of line
  fs.appendFile(UNIVERSITY_OUTPUT_FILEPATH, universities, err => {
    if (err) {
      throw new Error(err);
    }
    console.log('University data has been successfully written to disk');
  });
});