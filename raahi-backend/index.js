const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../raahi-client/dist')));

// The "catchall" handler: for any request that doesn't
// match a static file, send back React's index.html file.
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../raahi-client/dist', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
