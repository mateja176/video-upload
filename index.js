const fetch = require('isomorphic-fetch');
const { promises: fs } = require('fs');
const { join } = require('path');

const [uri] = process.argv.slice(2);

fs.readFile(join(__dirname, 'video.webm')).then((buffer) => {
  const body = new Blob(buffer, { type: 'video/webm' });

  fetch(uri, {
    method: 'POST',
    body,
  })
    .then((res) => {
      return res.json();
    })
    .then(console.log);
});
