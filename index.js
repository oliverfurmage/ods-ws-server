const WebSocket = require('ws');
 
const wss = new WebSocket.Server({
  port: 2222
});

wss.on('connection', function connection(ws, req, client) {

    // log connection
    console.log(`Connection {client: ${client},ip: ${req.connection.remoteAddress}}`);

    ws.on('message', function incoming(message) {
        // log message
      console.log(`Message Recieved: ${message}`);
      // forward to clients connected
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
});