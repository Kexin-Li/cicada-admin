import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Popover, Button, notification, Icon } from 'antd';
import { hexoServer, hexoStop, hexoDeploy } from '../../actions/hexoServer';
import MyButton from './MyButton';

class DeployBtn extends Component {
  openNotification = (msg, desc) => {
    const args = {
      message: msg,
      description: desc,
      icon: <Icon type='smile' style={{ color: '#108ee9' }} />
      // duration: 0,
    };
    notification.open(args);
  };

  componentDidUpdate(prevProps) {
    let msg = '', desc = '';
    const server = this.props.server;
    const stop = this.props.stop;
    const deploy = this.props.deploy;
    if (prevProps.server !== server) {
      msg = (server && server.status === 'success') ? '启动成功' : '正在启动';
      desc = '访问 http://localhost:4000 看看效果吧！';
      this.openNotification(msg, desc);
      return;
    }
    if (prevProps.stop !== stop) {
      msg = (stop && stop.status === 'success') ? '关闭成功' : '关闭启动';
      this.openNotification(msg);
      return;
    }
    if (prevProps.deploy !== deploy) {
      console.log('called');
      msg = (deploy && deploy.status === 'success') ? '部署成功' : '部署失败';
      this.openNotification(msg);
    }
  }

  onClickServer = () => {
    this.props.hexoServer();
  };
  
  onClickStop = () => {
    this.props.hexoStop();
  };
  
  onClickDeploy = () => {
    this.props.hexoDeploy();
  };

  render() {
    return (
      <div className='deploy' style={{ marginRight: '30px', float: 'right' }}>
        <MyButton
          content='关闭本地 Hexo 服务器' 
          type='danger' 
          btnName='Hexo Stop'
          onClickHandler={ this.onClickStop } 
        />
        <MyButton 
          content='启动本地 Hexo 服务器' 
          type='primary' 
          btnName='Hexo Server'
          onClickHandler={ this.onClickServer } 
        />
        <MyButton 
          content='部署到云服务器' 
          type='' 
          btnName='Hexo Deploy'
          onClickHandler={ this.onClickDeploy } 
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    server: state.hexoReducer.server,
    stop: state.hexoReducer.stop
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    hexoServer,
    hexoStop,
    hexoDeploy
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DeployBtn);