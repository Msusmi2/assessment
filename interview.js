const express = require('express');
const shortid = require('shortid');

const app = express();
const port = 3000;

// Store long URLs and their corresponding short codes
const urlDatabase = {};

// Redirect user to the original URL when accessing the shortened URL
app.get('/:shortCode', (req, res) => {
  const shortCode = req.params.shortCode;
  const longUrl = urlDatabase[shortCode];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

// Shorten a long URL
app.post('/shorten', express.json(), (req, res) => {
  const longUrl = req.body.longUrl;
  if (!longUrl) {
    res.status(400).send('Invalid URL');
    return;
  }

  // Generate a unique short code
  const shortCode = shortid.generate();
  urlDatabase[shortCode] = longUrl;

  // Construct the shortened URL
  const shortUrl = `http://localhost:${port}/${shortCode}`;
  res.json({ shortUrl });
});

app.listen(port, () => {
  console.log(`URL shortener service running at http://localhost:${port}`);
});
