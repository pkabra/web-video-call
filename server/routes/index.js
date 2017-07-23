const express = require('express');
const path = require('path');
const middleware = require('../middleware');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if (middleware.isDeveloping) {
    res.write(middleware.pack.fileSystem.readFileSync(path.join(__dirname, '../../public/index.html')));
    res.end();
  } else {
    res.sendFile(path.join(__dirname, '../../build/index.html'));
  }
});

module.exports = router;
