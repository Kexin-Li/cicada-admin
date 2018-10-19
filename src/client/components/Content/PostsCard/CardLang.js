import React from 'react';
import { Icon, Divider } from 'antd';
import format from 'date-fns/format';

const CardLang = (props) => {
  const date = format(props.date, 'YYYY-MM-DD');

  return (
    <div>
      <Icon type='global' style={{ marginRight: '5px' }} />
      { props.lang ? <span>{ props.lang }</span> : '' }
      { props.lang ? <Divider type='vertical' /> : '' }
      {date ? <span>{ date }</span> : '' }
    </div>
  );
};

export default CardLang;