const FRONT_MATTER = require('hexo-front-matter');
const FS = require('fs');
const DIR = require('node-dir');
const PATH = require('path');
const EXTEND = require('extend');
const HEXO_PATH = require('../models/config-init').data();

exports.updateDBFile = function () {
  let flagIndex = 0;

  // 初始化 _posts, _drafts, _trash文件夹
  ['post', 'draft', 'trash'].forEach((item) => {
    FS.access(
      HEXO_PATH[`${item}Path`],
      FS.F_OK,
      (err) => {
        if (err) {
          FS.mkdir(
            HEXO_PATH[`${item}Path`],
            (e) => {
              if (e) throw e;
              flagIndex++;
              if (flagIndex === 3) action();
            }
          );
          return;
        }
        flagIndex++;
        if (flagIndex === 3) action();
      }
    );
  });

  function action() {
    let loadingProcess = 0;


    const siteData = {
      hexoPath: HEXO_PATH.rootPath,
      theme: HEXO_PATH.theme,
      themeConfig: {
        title: 'Theme Config',
        file_path: HEXO_PATH.themeConfig,
        raw_content: getFile(HEXO_PATH.themeConfig)
      },
      siteConfig: {
        title: 'Site Config',
        file_path: HEXO_PATH.siteConfig,
        raw_content: getFile(HEXO_PATH.siteConfig)
      }
    };

    getMdFiles(HEXO_PATH.postPath, null, (dataArr) => {
      siteData.posts = dataArr;
      done();
    });
    getMdFiles(HEXO_PATH.draftPath, null, (dataArr) => {
      siteData.drafts = dataArr;
      done();
    });
    getMdFiles(HEXO_PATH.trashPath, null, (dataArr) => {
      siteData.trash = dataArr;
      done();
    });
    getMdFiles(HEXO_PATH.sourcePath, {
      match: /index\.md$/,
      excludeDir: ['_drafts', '_posts', '_trash']
    }, (dataArr) => {
      siteData.pages = dataArr;
      done();
    });

    function done() {
      if (++loadingProcess === 4) {
        siteData.tags = getTagData(siteData.posts);
        FS.writeFile(
          PATH.join(HEXO_PATH.adminPath, '__siteDB.json'),
          JSON.stringify(siteData),
          (err) => {
            if (err) throw err;
            // LOGGER.info('__siteDB.json update!');
          }
        );
      }
    }
  }
};

/**
 * 读取 markdown 文件
 * @param {string} dirPath - 文件路径
 * @param {object} match - 匹配文件
 * @param {function} callback
 * @returns {object[]} array of file content
 * */
function getMdFiles(dirPath, match, callback) {
  const data = [];

  DIR.readFiles(dirPath, match || {
    match: /.md$/
  },
  (err, content, filename, next) => {
    if (err) throw err;
    data.push(EXTEND(parseFileContent(filename, content), {
      page_url: filename.replace(/^.*source\//g, '')
    }));
    next();
  },
  (err, files) => {
    if (err) throw err;
    callback(data.sort(sortListFromNewToOld));
  });
}

/**
 * 读取文件内容
 * @param {string} filePath 文件路径
 * @returns {string} fileContent
 * */
function getFile(filePath) {
  let fileContent;

  try {
    fileContent = FS.readFileSync(filePath, 'utf-8');
  } catch (e) {
    throw e;
  }

  return fileContent;
}

/**
 * 对文章内容进行整理
 * @param fileNameWithPath {string} file name with path
 * @param content {string} file content
 * */
function parseFileContent(fileNameWithPath, content) {
  const file = {
    file_name: fileNameWithPath.replace(/^.*\//g, ''),
    file_path: fileNameWithPath,
    raw_content: content
  };
  EXTEND(file, FRONT_MATTER(content));
  // todo 如果没有时间，则设置文件创建时间
  file.date_unix = Date.parse(file.date) || 0;
  return file;
}

/**
 * 从文件数组中统计tags
 * @param {object[]} fileArr 文件数组
 * @returns {object} tag统计对象
 * */
function getTagData(fileArr) {
  const tagData = {
    length: 0
  };

  fileArr.forEach((item) => {
    if (!item.hasOwnProperty('tags') || !item.tags) return;
    Array.isArray(item.tags)
      ? item.tags.forEach(addNewTag)
      : addNewTag(item.tags);
  });

  function addNewTag(tagName) {
    if (tagData.hasOwnProperty(tagName)) {
      tagData[tagName].length++;
    } else {
      tagData[tagName] = {
        length: 1
      };
      tagData.length++;
    }
  }

  return tagData;
}

/** 对文件数组进行排序 */
function sortListFromNewToOld(file1, file2) {
  if (file1.date_unix > file2.date_unix) {
    return -1;
  } if (file1.date_unix < file2.date_unix) {
    return 1;
  }
  return 0;
}
