const PATH = require('path');
const HEXO_PATH = require('../models/config-init').data();
const GET_ALL_DATA = require('../models/get-all-data');

function deleteDBCache() {
  delete require.cache[PATH.join(HEXO_PATH.adminPath, '__siteDB.json')];
}

exports.entry = function (req, res) {
  deleteDBCache();
  GET_ALL_DATA.updateDBFile();
  res.send({ db: require('../__siteDB.json') });
};
