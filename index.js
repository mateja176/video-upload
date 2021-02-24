const fetch = require('isomorphic-fetch');

const [uri] = process.argv.slice(2);

fetch(uri, {
  method: 'GET',
})
  .then((res) => {
    return res.text();
  })
  .then(console.log);
