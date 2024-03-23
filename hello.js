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
        } else if(data == "[]"){
          res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'access-control-allow-origin'
          });
          con.close();
          clearTimeout(t);
          res.end(JSON.stringify([]));
        }
        
      }
    } else {
      res.writeHead(400);
      res.end('Not Found');
    }
  } else if(req.url.includes('renameFile')){
    const params = url.parse(req.url, true).query;
    const id = params.id;
    const oldPath = params.oldpath;
    const newPath = params.newpath;
    if(id && oldPath && newPath){
      var con = new WebSocket('wss://server.moddereducation.com/'+id), t;
      con.onopen = function(){
        con.send('renameFile->'+oldPath+'->'+newPath);
        t = setTimeout(() => {
          res.writeHead(400);
          res.end('Error');
          con.close();
        }, 5000);
      }
      con.onmessage = function(msg){
        var data = msg.data;
        if(data == 'Suc: rename'){
          res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'access-control-allow-origin'
          });
          res.end('Success');
          con.close();
          clearTimeout(t);
        } else if(data == 'Err: rename file') {
          res.writeHead(400);
          res.end('Error');
          con.close();
          clearTimeout(t);
        }
      }
    } else {
      res.writeHead(400);
      res.end('Not Found');
    }
  } else if(req.url.includes('deleteFile')){
    const params = url.parse(req.url, true).query;
    const id = params.id;
    const path = params.path;
    if(id && path){
      var con = new WebSocket('wss://server.moddereducation.com/'+id), t;
      con.onopen = function(){
        con.send('deleteFile->'+path);
        t = setTimeout(() => {
          res.writeHead(400);
          res.end('Error');
          con.close();
        }, 5000);
      }
      con.onmessage = function(msg){
        var data = msg.data;
        if(data == 'Suc: delete'){
          res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'access-control-allow-origin'
          });
          res.end('Success');
          con.close();
          clearTimeout(t);
        } else if(data == 'Err: delete') {
          res.writeHead(400);
          res.end('Error');
          con.close();
          clearTimeout(t);
        }
      }
    }
    } else if(req.url.includes('deleteFolder')){
    const params = url.parse(req.url, true).query;
    const id = params.id;
    const path = params.path;
    if(id && path){
      var con = new WebSocket('wss://server.moddereducation.com/'+id), t;
      con.onopen = function(){
        con.send('deleteFolder->'+path);
        t = setTimeout(() => {
          res.writeHead(400);
          res.end('Error');
          con.close();
        }, 5000);
      }
      con.onmessage = function(msg){
        var data = msg.data;
        if(data == 'Suc: delete folder'){
          res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'access-control-allow-origin'
          });
          res.end('Success');
          con.close();
          clearTimeout(t);
        } else if(data == 'Err: delete folder') {
          res.writeHead(400);
          res.end('Error');
          con.close();
          clearTimeout(t);
        }
      }
    } else {
      res.writeHead(400);
      res.end('Not Found');
    }
  } else if(req.url.includes('createFile')){
    const params = url.parse(req.url, true).query;
    const id = params.id;
    const path = params.path;
    const name = params.name;
    if(id && path && name){
      var con = new WebSocket('wss://server.moddereducation.com/'+id), t;
      con.onopen = function(){
        con.send('createFile->'+path+name);
        t = setTimeout(() => {
          res.writeHead(400);
          res.end('Error');
          con.close();
        }, 5000);
      }
      con.onmessage = function(msg){
        var data = msg.data;
        if(data == 'Suc: createFile'){
          res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'access-control-allow-origin'
          });
          res.end('Success');
          con.close();
          clearTimeout(t);
        } else if(data == 'Err: createFile') {
          res.writeHead(400);
          res.end('Error');
          con.close();
          clearTimeout(t);
        }
      }
    } else {
      res.writeHead(400);
      res.end('Not Found');
    }
  } else if(req.url.includes('createFolder')){
    const params = url.parse(req.url, true).query;
    const id = params.id;
    const path = params.path;
    const name = params.name;
    if(id && path && name){
      var con = new WebSocket('wss://server.moddereducation.com/'+id), t;
      con.onopen = function(){
        con.send('createFolder->'+path+name);
        t = setTimeout(() => {
          res.writeHead(400);
          res.end('Error');
          con.close();
        }, 5000);
      }
      con.onmessage = function(msg){
        var data = msg.data;
        if(data == 'Suc: createFolder'){
          res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'access-control-allow-origin'
          });
          res.end('Success');
          con.close();
          clearTimeout(t);
        } else if(data == 'Err: createFolder') {
          res.writeHead(400);
          res.end('Error');
          con.close();
          clearTimeout(t);
        }
      }
    } else {
      res.writeHead(400);
      res.end('Not Found');
    }
  } else if(req.url.includes('getFiles')){
    const params = url.parse(req.url, true).query;
    const id = params.id;
    const path = params.path;
    const name = params.name;
    if(id && path && name){
      var con = new WebSocket('wss://server.moddereducation.com/'+id), t, content = "";
      con.onopen = function(){
        con.send('getFiles->'+path+name);
        t = setTimeout(() => {
          res.writeHead(400);
          res.end('Error');
          con.close();
        }, 10000);
      }
      con.onmessage = function(msg){
        var data = msg.data;
          if(data == 'Suc: getFile->'+path+name){
            res.writeHead(200, {
              'Content-Type': 'text/plain',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'access-control-allow-origin'
            });
            res.end(content);
            con.close();
            clearTimeout(t);
          } else if(data == 'Err: getFile->'+path+name) {
            res.writeHead(400);
            res.end('Error');
            con.close();
            clearTimeout(t);
          } else if(data.substr(0, 6) == "chunk:"){
            content += data.substr(6);
          }
      };
    } else if(req.url.includes('saveFiles')){
    if(req.method == "POST"){
      req.on('data', (chunks) => {
        chunk.push(chunks);
      });
      req.on('end', () => {
        const content = Buffer.concat(chunk).toString();
        console.log(content);
        // if(id && path && name){
        // var con = new WebSocket('wss://server.moddereducation.com/'+id), t, content = "";
        // con.onopen = function(){
        //   con.send('saveFiles->'+path+name);
        //   t = setTimeout(() => {
        //     res.writeHead(400);
        //     res.end('Error');
        //     con.close();
        //   }, 10000);
        // }
        // con.onmessage = function(msg){
        //   var data = msg.data;
        //     if(data == 'Suc: saveFile->'+path+name){
        //       res.writeHead(200, {
        //         'Content-Type': 'text/plain',
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Headers': 'access-control-allow-origin'
        //       });
        //       res.end(content);
        //       con.close();
        //       clearTimeout(t);
        //     } else if(data == 'Err: saveFile->'+path+name) {
        //       res.writeHead(400);
        //       res.end('Error');
        //       con.close();
        //       clearTimeout(t);
        //     } else if(data == "whatCont?"){
        //       ws.send('content:'+cont);
        //     }
        //   };
        // } else {
        //   res.writeHead(400);
        //   res.end('Not Found');
        // }
      });
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
    if(!msg.toString().includes("chunk:")){
      if(msg.toString().includes("getMem")){
        broadcast(msg.toString(), req.url, 'host');
      } else if(msg.toString().includes("listFiles->")){
        broadcast(msg.toString(), req.url, 'host');
      } else if(msg.toString().includes("renameFile->")){
        broadcast(msg.toString(), req.url, 'host');
      } else if(msg.toString().includes("deleteFile->")){
        broadcast(msg.toString(), req.url, 'host');
      } else if(msg.toString().includes("deleteFolder->")){
        broadcast(msg.toString(), req.url, 'host');
      } else if(msg.toString().includes("createFile->")){
        broadcast(msg.toString(), req.url, 'host');
      } else if(msg.toString().includes("createFolder->")){
        broadcast(msg.toString(), req.url, 'host');
      } else if(msg.toString().includes("getFiles->")){
        broadcast(msg.toString(), req.url, 'host');
      } else {
        broadcast(msg.toString(), req.url, 'user');
      }
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
