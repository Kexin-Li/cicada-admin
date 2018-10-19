import React from 'react';
import { Layout, Icon } from 'antd';
import Menus from './Menus';

const { Sider } = Layout;

const SideBar = (props) => {

  return (
    <Sider
      width={ 250 }
      collapsible
      theme='light'
      breakpoint='lg'
    >
      <h2 className='logo'>Cicada Admin</h2>
      <Menus />
    </Sider>
  )
};

export default SideBar;