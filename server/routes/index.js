const express = require('express');
const path = require('path');
const middleware = require('../middleware');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const index = path.join(__dirname, '../../build/index.html');
  if (middleware.isDeveloping) {
    res.write(middleware.jsMiddleware.fileSystem.readFileSync(index));
    res.end();
  } else {
    res.sendFile(index);
  }
});

module.exports = router;
