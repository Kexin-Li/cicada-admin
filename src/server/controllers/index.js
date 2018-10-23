const HEXO_PATH = require('../models/config-init').data(),
    PATH = require('path'),
    FS = require('fs'),
    GET_ALL_DATA = require('../models/get-all-data');

exports.entry = function(req, res) {
  deleteDBCache();
  GET_ALL_DATA.updateDBFile();
  res.send({ db: require('../__siteDB.json')});
};

function deleteDBCache() {
  delete require.cache[PATH.join(HEXO_PATH.adminPath, '__siteDB.json')];
}