const dbHandler = require('../models/readFiles');

exports.fetchPosts = function(req, res) {
  dbHandler.readFiles();
};