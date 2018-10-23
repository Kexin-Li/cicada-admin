import React from 'react';
import { Divider } from 'antd';

const Settings = (props) => {
  const { view } = props;
  return (
    <div>
      <h3>Hexo Path</h3>
      <p>{ view.hexoPath }</p>
      <h3>Hexo Theme</h3>
      <p>{ view.theme }</p>
      <Divider />
    </div>
  );
};

export default Settings;
