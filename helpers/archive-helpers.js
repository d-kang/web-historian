var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(err, sites) {
    sites = sites.toString().split('\n');  // create array of sites from sites.txt
    if (callback) {
      callback(sites); // send array of sites as argument in callback func
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(sites) {
    var found = _.any(sites, function(site, i) {  // return true if site matched url or false if it didn't
      return site.match(url);
    });
    callback(found);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function(err, file) {
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  var sitePath = path.join(exports.paths.archivedSites, url);

  fs.access(sitePath, function(err) {
    callback(!err);  // if err undefined, return true
  });
};

exports.downloadUrls = function(urls) {
  // Iterate over urls and pipe to new files
  _.each(urls, function (url) {
    if (!url) { return; }  // if url is undefined, go to next url
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url)); // download website and pipe it to a create stream that save it in archives/sites/websiteURL
  });
};
