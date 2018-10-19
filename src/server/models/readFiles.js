const fs = require('fs');
const dir = require('node-dir');
const path = require('path');
const extend = require('extend');
const front_matter = require('hexo-front-matter');

const initPath = require('./init').initPath;

exports.readFiles = function() {
  const config = initPath();
  // console.log(initFile(config));
  // readMdFiles(config);
  handleFiles(config);
};

function handleFiles(config) {
  if (!initFile(config)) return;
  
}

/**
 * initialize
 * @param {Object} config site info
 */
function initFile(config) {
  const files = ['posts', 'drafts'];
  let flag = 0;

  files.map(file => {
    fs.access(config[file + 'Path'], fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdir(filePath, (err) => {
          if (err) throw e;
        });
      }
    });
    flag++;
  });
  return (flag === 2) ? true : false;
};

function handleMdFiles(config) {
  const postsDir = config.postsPath;
  const draftsDir = config.draftsPath;
  const sourceDir = config.sourcePath;

  let siteData = {
    hexoPath: config.hexoPath,
    theme: config.theme,
    themeConfig: {
      title: 'Theme Config',
      file_path: config.themePath,
      raw_content: readFile(config.themePath)
    },
    siteConfig: {
      title: 'Site Config',
      file_path: config.sitePath,
      raw_content: readFile(config.sitePath)
    }
  };

}

/**
 * read markdown file
 * @param {String} dir file directory
 * @param {Function} callback callback function
 */
function readMdFiles(dir, callback) {
  let data = [];

  // 递归遍历文件夹，整理出 md 文件
  dir.readFiles(postsDir, {
    match: /.md$/
  }, function(err, content, filename, next) {
    if (err) throw err;
    // 处理文件内容
    data.push(
      extend(
        parseFileContent(filename, content), 
        { page_url: filename.replace(/^.*source\//g, '') }
      )
    );
    next();
  }, function(err, files) {
    if (err) throw err;
    console.log('finished reading files: ', files);
    callback(data.sort(sortListFromNewToOld));
  });
}

/**
 * make file object
 * @param {String} fileNameWithPath file's absolute path
 * @param {String} content file's content
 */
function parseFileContent(fileNameWithPath, content) {
  let file = {
    file_name: fileNameWithPath.replace(/^.*\//g, ''),
    file_path: fileNameWithPath,
    raw_content: content
  };
  extend(file, front_matter(content));
  file.date_unix = Date.parse(file.date) || 0;
  return file;
}

/**
 * sort file from date new to date old
 * @param {Object} file1 file object
 * @param {Object} file file object
 */
function sortListFromNewToOld(file1, file) {
  return file2.date_unix > file1.date_unix;
}

/**
 * read file
 * @param {String} filePath file path
 */
function readFile(filePath) {
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch(e) {
    throw e;
  }
  return content;
}