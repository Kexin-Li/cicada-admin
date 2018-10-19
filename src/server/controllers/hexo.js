const CHILD_PROCESS = require('child_process'),
  HEXO_PATH = require('../models/config-init').data(),
  TREE_KILL = require('tree-kill');

var hexo_server = null,
  isWin = /^win/.test(process.platform),
  hexo_pid = NaN;
hexo_cli = isWin ? 'hexo.cmd' : 'hexo';

exports.server = function (req, res) {
  try {
    if (!Number.isNaN(hexo_pid)) killHexo();

    // 启动时先 clean 一下
    var clean = CHILD_PROCESS.spawn(
      hexo_cli,
      ['clean'], {
        cwd: HEXO_PATH.rootPath
      }
    );

    clean.stdout.on('data', function (data) {
      console.log(data.toString('utf8'));
    });

    clean.on('exit', function () {
      console.log('hexo cleaned!');
      hexo_server = CHILD_PROCESS.spawn(
        hexo_cli,
        ['server'], {
          cwd: HEXO_PATH.rootPath
        }
      );

      hexo_pid = hexo_server.pid;
      console.log('hexo pid:' + hexo_pid);

      hexo_server.stdout.on('data', function (data) {
        console.log(data.toString('utf8'));
      });

      res.json({
        "status": "success"
      });
    });
  } catch (e) {
    res.status(500).send({
      "status": "error",
      "msg": "hexo server launch failed！"
    });
  }
};

exports.kill = function (req, res) {
  try {
    killHexo();
    res.json({
      "status": "success"
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.deploy = function (req, res) {
  try {
    var hexo_deploy = CHILD_PROCESS.spawn(
      hexo_cli,
      ['deploy', '-g'], {
        cwd: HEXO_PATH.rootPath
      }
    );

    hexo_deploy.stdout.on('data', function (data) {
      console.log(data.toString('utf8'));
    });

    hexo_deploy.on('exit', function () {
      console.log('hexo deployed!');
      res.json({
        "status": "success"
      });
    });
  } catch (e) {
    res.status(500).send({
      "status": "error",
      "msg": "hexo deploy failed！"
    });
  }
};

function killHexo() {
  if (isWin) {
    TREE_KILL(hexo_pid, 'SIGTERM', function (err) {
      if (err) {
        console.log('kill hexo failed. hexo pid:' + hexo_pid + ';error=' + JSON.stringify(err));
        return;
      }
      console.log('hexo stopped');
      hexo_pid = NaN;
    });
  } else {
    hexo_server.kill();
    hexo_pid = NaN;
    console.log('hexo stopped');
  }
}