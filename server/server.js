const express = require('express');
const cors = require('cors');
const path = require('path');
const { PORT, UNIVERSITY_JSON_PATH } = require('./config');

const app = express();
app.use(cors());

app.get('/universityTrie', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', UNIVERSITY_JSON_PATH));
});
app.listen(PORT, () => console.log(`Express server listening on Port ${PORT}...`));
