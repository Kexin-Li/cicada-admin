import React from 'react';
import { Button, Popover } from 'antd';

const MyButton = (props) => {
  return (
    <Popover content={ props.content }>
      <Button
        type={ props.type }
        style={{ marginRight: '10px' }}
        onClick={ props.onClickHandler }
      >
        { props.btnName }
      </Button>
    </Popover>
  );
};

export default MyButton;