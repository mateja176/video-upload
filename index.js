const fetch = require('isomorphic-fetch');
const Blob = require('blob');
const { promises: fs } = require('fs');
const { join } = require('path');

const [uri] = process.argv.slice(2);

fs.readFile(join(__dirname, 'video.webm')).then((buffer) => {
  const blob = new Blob(buffer, { type: 'video/webm' });

  const formData = new FormData();

  formData.append('video.webm', blob);

  fetch(uri, {
    method: 'POST',
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then(console.log);
});
