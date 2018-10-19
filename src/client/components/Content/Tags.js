import React from 'react';
import { Tag } from 'antd';

const Tags = (props) => {
  const renderTags = () => {
    const tags = props.view;
    console.log(tags);
    if (tags) {
      const tagsArr = Object.keys(tags);
      return tagsArr.map((tag, index) => {
        return (
          <Tag key={ index }>{ tag }</Tag>
        );
      });
    }
  };
  return (
    <div>
      { renderTags() }
    </div>
  );
};

export default Tags;