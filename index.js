const WebSocket = require('ws');
 
const wss = new WebSocket.Server({
  port: 2222
});
 
wss.on('connection', function connection(ws, req, client) {
    console.log(`Connection {client: ${client},ip: ${req.connection.remoteAddress}}`);

    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
});