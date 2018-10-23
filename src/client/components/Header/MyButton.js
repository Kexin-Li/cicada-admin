import React from 'react';
import { Button, Popover } from 'antd';

const MyButton = (props) => {
  const {
    content, type, onClickHandler, btnName
  } = props;
  return (
    <Popover content={content}>
      <Button
        type={type}
        style={{ marginRight: '10px' }}
        onClick={onClickHandler}
      >
        { btnName }
      </Button>
    </Popover>
  );
};

export default MyButton;
