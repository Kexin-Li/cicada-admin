const HEXO_PATH = require('../models/config-init').data(),
    PATH = require('path'),
    FS = require('fs'),
    GET_ALL_DATA = require('../models/get-all-data');

exports.fetchPosts = function(req, res) {
  
};

exports.entry = function(req, res) {
  deleteDBCache();
  res.send({ db: require('../__siteDB.json')});
};

function deleteDBCache() {
  delete require.cache[PATH.join(HEXO_PATH.adminPath, '__siteDB.json')];
}