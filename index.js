const fetch = require('isomorphic-fetch');
// const Blob = require('node-blob');
const FormData = require('form-data');
const { promises: fs } = require('fs');
const { join } = require('path');

const [uri] = process.argv.slice(2);

console.log('Reading file...');
fs.readFile(join(__dirname, 'video.webm'))
  .then((buffer) => {
    // blobs are not supported by FormData from form-data
    // const blob = new Blob(buffer, { type: 'video/webm' });

    const formData = new FormData();

    formData.append('video.webm', buffer, { filename: 'video.webm' });

    console.log('Uploading file...');

    fetch(uri, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log('File uploaded...');
        console.log('Response:');
        console.log(json);
      })
      .catch((error) => {
        console.log('Failed upload file...');
        console.log('Error:');
        console.log(error);
      });
  })
  .catch((error) => {
    console.log('Failed read file...');
    console.log('Error:');
    console.log(error);
  });
