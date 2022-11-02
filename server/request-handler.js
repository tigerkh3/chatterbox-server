/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

// Notes:
// probably do something with module.exports like in lecture
// probably need to export this file and use require in basic-server.js to allow this to work
//var requestHandler
//var exports = module.exports = {};

// data array variable
var storage = [];
// create id variable
//
// // variable for json test message
var testJSON = {
  message_id: 0,
  username: 'username',
  text: 'text',
  roomname: 'lobby'
}

storage.push(testJSON);

var qs = require('querystring');

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  // server: `http://127.0.0.1:3000/classes/messages`
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  // 'application/json',
  headers['Content-Type'] = 'application/json';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // GET METHOD
  if (request.method === 'GET' && request.url.includes('classes/messages')) {
    response.writeHead(200, headers)
    response.end(JSON.stringify(storage));
  } else if (request.method === 'POST' && request.url.includes('classes/messages')) {
    // POST METHOD
    response.writeHead(201, headers);
    var body;
    request.on('data', (data) => {
      // turn buffer data into actual data object
      body = data;
      // if our data is an object
    });
    request.on('end', () => {
      var buf = Buffer.from(body);
      var dataObj = JSON.parse(buf);

      if (typeof dataObj === 'object') {
        // add it to the front of our storage array
        dataObj.message_id = storage.length
        storage.unshift(dataObj);
        // else if its not
      } else {
        // transform it
        var temp = JSON.parse(dataObj);
        temp.message_id = storage.length;
        storage.unshift(temp);
      }
      // we need to send back our update data
      //
      response.end(JSON.stringify(storage));
    })
  } else if (request.method === 'OPTIONS' && request.url.includes('classes/messages')) {
    response.writeHead(200, headers)
    response.end(JSON.stringify(storage));
  } else {
    response.writeHead(404, headers);
    response.end();
  }

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

exports.requestHandler = requestHandler;