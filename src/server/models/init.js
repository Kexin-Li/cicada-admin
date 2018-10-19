const fs = require('fs');
const path = require('path');

const hexoPath = '/Users/likexin/Documents/Projects/practice/blog/hexo-git';
const theme = 'cicada';

exports.initPath = function() {
  return {
    configPath: hexoPath,
    theme: theme,
    themePath: path.join(hexoPath, 'themes', theme, '_config.yml'),
    sitePath: path.join(hexoPath, '_config.yml'),
    sourcePath: path.join(hexoPath, 'source'),
    postsPath: path.join(hexoPath, 'source', '_posts'),
    draftsPath: path.join(hexoPath, 'source', '_drafts'),
  };
}