// This bridges WebSocket communication with local sockets.
// To use, downlodad node.js. Open terminal and, node ws.js.

var websocket = require("./wsserver");
var connections = Object.create(null); // to keep track of who's connecting

websocket.listen(9999, "localhost", function(conn) {
  conn.id = Math.random().toString().substr(2); //generate random id for user
  connections[conn.id] = conn;
  console.log("New WS connection: " + conn.id);

  conn.on("data", function(opcode, data) {
    console.log("\t" + conn.id + ":\t" + data);

    try{
      client.write(data+'\n'); // send to local socket
    } catch(err) {
      console.log(err);
    }

  });

  conn.on("close", function(code, reason) {
    console.log("WS connection closed: " + conn.id, code, reason);
    delete connections[conn.id];
  });
});


// Setup local socket
var net = require('net');

var client = new net.Socket();

client.connect(4000, '127.0.0.1', function() {
	console.log('Connected to local socket');
})
.on('error',function(){
  console.log("No local server is running. \n\nIf you're using Maya you need to start that up fist and input the following into the MEL box: commandPort -n \"localhost:4000\";");
  process.exit(1);
});

client.on('data', function(data) {
	console.log('Received from local socket: ' + data);
	// client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection to local socket closed');
});
