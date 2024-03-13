var express = require('express')
const server = express()
.use((req, res) => res.sendFile('/source.html', { root: __dirname }))
.listen(3000, () => console.log(`Listening on ${3000}`));
const { Server } = require('ws');
const ws = require('ws')
const wss = new Server({server});

wss.on('connection',(client, req)=>{
  console.log(req.url);
  client.on('close', () => {
    console.log('dc')
  })
});
