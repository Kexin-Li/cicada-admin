import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import { updateView } from '../../actions/updateView';

const Menus = (props) => {
  const onClickHandler = (view) => {
    props.updateView(view);
  };
  return (
    <Menu theme='light' defaultSelectedKeys={['1']} mode='inline'>
      <Menu.Item key='1' onClick={ () => onClickHandler('posts') }>
        <Link to='/'>
          <Icon type='book' />
          <span>Posts</span>
        </Link>
      </Menu.Item>
      <Menu.Item key='2' onClick={ () => onClickHandler('drafts') }>
        <Link to='/drafts'>
          <Icon type='read' />
          <span>Drafts</span>
        </Link>
      </Menu.Item>
      <Menu.Item key='3' onClick={ () => onClickHandler('pages') }>
        <Link to='/pages'>
          <Icon type='file-text' />
          <span>Pages</span>
        </Link>
      </Menu.Item>
      <Menu.Item key='4' onClick={ () => onClickHandler('tags') }>
        <Link to='/tags'>
          <Icon type='tag' />
          <span>Tags</span>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='5' onClick={ () => onClickHandler('settings') }>
        <Link to='settings'>
          <Icon type='setting' />
          <span>Settings</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateView
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(Menus);
