const http = require('http');
const url = require('url');
const ws = require('ws');
const WebSocket = require('ws');
const server = http.createServer(async (req, res) => {
  if(req.url.includes('getMem')){
    const params = url.parse(req.url, true).query;
    const id = params.id;
    if(id){
      var con = new WebSocket('wss://server.moddereducation.com/'+id), t;
      con.onopen = function(){
        con.send('getMem');
        t = setTimeout(() => {
          res.writeHead(400);
          res.end('Error');
          con.close();
        }, 5000);
      }
      con.onmessage = function(msg){
        var data = msg.data;
        if(data.includes('{"cpu"')){
          var json = JSON.parse(data);
          if(json.cpu){
            res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'access-control-allow-origin'
            });
            json.id = id;
            res.end(JSON.stringify(json));
            con.close();
            clearTimeout(t);
          } else {
            res.writeHead(400);
            res.end('Error');
            con.close();
            clearTimeout(t);
          }
        }
        
      }
    } else {
      res.writeHead(400);
      res.end('Not Found');
    }
  } else if(req.url.includes('fileList')){
    const params = url.parse(req.url, true).query;
    const id = params.id;
    const path = params.path;
    if(id && path){
      var con = new WebSocket('wss://server.moddereducation.com/'+id), t;
      con.onopen = function(){
        con.send('listFiles->'+path);
        t = setTimeout(() => {
          res.writeHead(400);
          res.end('Error');
          con.close();
        }, 5000);
      }
      con.onmessage = function(msg){
        var data = msg.data;
        if(data.includes('{"name"')){
          var json = JSON.parse(data);
          if(json[0]){
            res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'access-control-allow-origin'
            });
            con.close();
            clearTimeout(t);
            res.end(JSON.stringify(json));
          } else {
            res.writeHead(400);
            res.end('Error');
            con.close();
            clearTimeout(t);
          }
        }
        
      }
    } else {
      res.writeHead(400);
      res.end('Not Found');
    }
  } else {
    res.writeHead(400);
    res.end('Not Found');
  }
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const { Server } = require('ws');
const wss = new Server({server});

wss.on('connection',(client, req)=>{
  console.log('client connected on '+req.url);
  client.id = req.url;
  client.on('close', () => {
    console.log('Client Disconnected');
  });
  client.on('message',(msg) => {
    if(msg.toString().includes("getMem")){
      broadcast(msg.toString(), req.url, 'host');
    } else if(msg.toString().includes("listFiles->")){
      broadcast(msg.toString(), req.url, 'host');
    } else {
      broadcast(msg.toString(), req.url, 'user');
    }
  })
});

function broadcast(msg, senderURL, toWho) {      
  for(const client of wss.clients){
    if(toWho == "host"){
      if(client.readyState === ws.OPEN && client.id == senderURL+"-host"){
        client.send(`${msg}`);
      }
    } else {
      if(client.readyState === ws.OPEN && client.id == senderURL.replace("-host", "")){
        client.send(`${msg}`);
      }
    }
  }
}
