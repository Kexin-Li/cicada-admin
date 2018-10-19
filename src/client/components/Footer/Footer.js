import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const MyFooter = (props) => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Made with 💙 by <a href='https://github.com/kexin-li' target='_blank'>likexin</a>
    </Footer>
  )
};

export default MyFooter;
