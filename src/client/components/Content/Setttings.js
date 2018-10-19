import React from 'react';
import { Divider } from 'antd';

const Settings = (props) => {
  const data = props.view;
  return (
    <div>
      <h3>Hexo Path</h3>
      <p>{ data.hexoPath }</p>
      <h3>Hexo Theme</h3>
      <p>{ data.theme }</p>
      <Divider />
      {/* <Button type='primary' style={{ marginRight: '10px' }}>Hexo Server</Button>
      <Button>Hexo Deploy</Button> */}
    </div>
  );
};

export default Settings;