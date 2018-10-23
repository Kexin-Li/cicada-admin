import React from 'react';
import { Icon, Divider } from 'antd';

const CardTags = (props) => {
  const { categories } = props;
  const { tags } = props;

  console.log(tags);

  const isArray = (a) => {
    Array.isArray ? Array.isArray(a) : Object.prototype.toString.call(a) === '[object Array]';
  };

  const renderItems = (items) => {
    if (!isArray(items)) {
      items = [props.items];
    }
    return items.map((item, index) => (
      <div key={index}>
        <span>{ item }</span>
        <Divider type="vertical" />
      </div>
    ));
  };

  return (
    <div>
      { categories ? <Icon /> : '' }
      { categories ? renderItems(categories) : '' }
      <Divider type="vertical" />
      { tags ? renderItems(tags) : '' }
    </div>
  );
};

export default CardTags;
