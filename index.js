const express = require('express');
const fetch = require('node-fetch');
const app = express()
const port = 3000

const username = 'admin@madisonbraids.com';
const password = 'eb09287b1f7643074e9a345d6d29699322ab132ea9e90c2998088788a51c434e';
const auth = 'Basic ' + new Buffer.from(username + ':' + password).toString('base64');

app.get('/', (req, res) => {
    let start = new Date();
    let end = new Date();
    if (req.query.start_date) {
        start = req.query.start_date;
    }
    if (req.query.end_date) {
        end = req.query.end_date;
    }
    const startTime = new Date(start).toISOString();
    const endTime = new Date(end).toISOString();
    let url = 'https://madisonbraids.gorgias.com/api/stats/overview';

    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify({
        filters: {
          period: {
            end_datetime: endTime,
            start_datetime: startTime
          }
        }
      })
    };
    
    fetch(url, options)
      .then(res1 => res1.json())
      .then(json => res.json(json))
      .catch(err => console.error('error:' + err));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})