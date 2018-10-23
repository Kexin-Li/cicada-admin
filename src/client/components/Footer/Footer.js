import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const MyFooter = () => (
  <Footer style={{ textAlign: 'center' }}>
    Made with
    <span role="img" aria-label="love">💙</span>
    by
    <a href="https://github.com/kexin-li" target="_blank" rel="noopener noreferrer">Mos</a>
  </Footer>
);

export default MyFooter;
