const CHILD_PROCESS = require('child_process');
const HEXO_PATH = require('../models/config-init').data();
const TREE_KILL = require('tree-kill');

let hexoServer = null;
const isWin = /^win/.test(process.platform);


let hexoPid = NaN;
hexoCli = isWin ? 'hexo.cmd' : 'hexo';

exports.server = function (req, res) {
  try {
    if (!Number.isNaN(hexoPid)) killHexo();

    // 启动时先 clean 一下
    const clean = CHILD_PROCESS.spawn(
      hexoCli,
      ['clean'], {
        cwd: HEXO_PATH.rootPath
      }
    );

    clean.stdout.on('data', (data) => {
      console.log(data.toString('utf8'));
    });

    clean.on('exit', () => {
      console.log('hexo cleaned!');
      hexoServer = CHILD_PROCESS.spawn(
        hexoCli,
        ['server'], {
          cwd: HEXO_PATH.rootPath
        }
      );

      hexoPid = hexoServer.pid;
      console.log(`hexo pid:${hexoPid}`);

      hexoServer.stdout.on('data', (data) => {
        console.log(data.toString('utf8'));
      });

      res.json({
        status: 'success'
      });
    });
  } catch (e) {
    res.status(500).send({
      status: 'error',
      msg: 'hexo server launch failed！'
    });
  }
};

exports.kill = function (req, res) {
  try {
    killHexo();
    res.json({
      status: 'success'
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.deploy = function (req, res) {
  try {
    const hexo_deploy = CHILD_PROCESS.spawn(
      hexoCli,
      ['deploy', '-g'], {
        cwd: HEXO_PATH.rootPath
      }
    );

    hexo_deploy.stdout.on('data', (data) => {
      console.log(data.toString('utf8'));
    });

    hexo_deploy.on('exit', () => {
      console.log('hexo deployed!');
      res.json({
        status: 'success'
      });
    });
  } catch (e) {
    res.status(500).send({
      status: 'error',
      msg: 'hexo deploy failed！'
    });
  }
};

function killHexo() {
  if (isWin) {
    TREE_KILL(hexoPid, 'SIGTERM', (err) => {
      if (err) {
        console.log(`kill hexo failed. hexo pid:${hexoPid};error=${JSON.stringify(err)}`);
        return;
      }
      console.log('hexo stopped');
      hexoPid = NaN;
    });
  } else {
    hexoServer.kill();
    hexoPid = NaN;
    console.log('hexo stopped');
  }
}
