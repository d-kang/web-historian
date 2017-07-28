var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};


var tempData = [];

// As you progress, keep thinking about what helper functions you can put here!

// in index.html user enters google.com
// not archived so send to loading page
// in loading page, user types google.com then serves googles html
  // enter would trigger post request? so would logic go in post or get?
// in index.html user types google.com
// we have google in archive
  // serve googles html?
  // this would trigger post request so would logic go in post for serving googles html?

exports.actions = {
  GET: function(request, response) {
    // require headers
    var html = '';
    fs.readFile('./web/public/index.html', function(error, data) {
      if (error) {
        console.log(error);
      }
      html += data.toString();
      console.log(typeof html);
      response.writeHead(200, headers);
      response.end(html);
    });

  },
  POST: function(request, response) {
    var body = '';
    request.on('data', function(chunks) {
      body += chunks;  // This is converting the buffer chunks from __ to string
      console.log('chunks', chunks);
    })
      .on('end', function() {
        // may need to parse later if its an obj
        console.log('body', body);
        // tempData.push(body);
        // put headers later
        // response.writeHead(201, headers);
        // response.end(body);
            // Get URL so it is www.google.com (and not url=www.google.com)
        body = body.replace(/url=/, '');
        // IF url is in site.txt
        archive.isUrlInList(body, function(found) {
          console.log('found: ', found); // true or false
          if (found) {
            // Y check if its in the archives/sites folder
            archive.isUrlArchived(body, function() {

            });
              // Y redirect client to file //done
            // N redirect to loading.html
          } else { // ELSE
            // add url to site.txt
            // redirect to loading page
          }

        });
      });

  },
  OPTIONS: function(request, response) {
    // put headers later
    response.writeHead(200, headers);
    response.end('this is options');
  }
};
