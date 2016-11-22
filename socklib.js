function SockLib(url, port) {
  var ws = new WebSocket("ws://"+url+":"+port+"/repl");
  var rtg = 0;
  ws.onopen = function () {
    // ws.send('ping'); // Send the message 'ping' to the server
    rtg = 1;
  };

  ws.onmessage = function(e) {
    console.log(e.data);
  };

  ws.onerror = function (error) {
    console.log('WebSocket Error ' + error);
  };

  ws.onclose = function(e) {
    console.log(e);
  };

  this.sendmsg = function(tmsg) {
    if (rtg == 1) {
      try {
        ws.send(tmsg);
      } catch (err) {
        console.log(err);
      }

    } else {
      console.log("had to wait");
      setTimeout(function() { // There's a better way to do this...
        try {
          ws.send(tmsg);
        } catch (err) {
          console.log(err);
        }
    }, 1000);
    }
  };

}
