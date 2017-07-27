var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var helpers = require('./http-helpers.js');







exports.handleRequest = function (request, response) {
  var action = helpers.actions[request.method];
  if (action) {
    action(request, response);
  } else {
    // handle something maybe 404
    response.writeHead(404);
    response.end('error error error');
  }

  // if (request.method === 'GET') {
  //   // require headers
  //   response.writeHead(200);
  //   response.end(JSON.stringify(tempData));
  // } else if (request.method === 'POST') {
  //   var body = '';
  //   request.on('data', function(chunks) {
  //     body += chunks;
  //   })
  //     .on('end', function() {
  //       // may need to parse later if its an obj
  //       tempData.push(body);
  //       // put headers later
  //       response.writeHead(201);
  //       response.end(body);
  //     });
  // } else if (request.method === 'OPTIONS') {
  //   // put headers later
  //   response.writeHead(200);
  //   response.end('this is options');
  // }



  // Line below is commented out for now but to be used in future!
  //  res.end(archive.paths.list);
};
