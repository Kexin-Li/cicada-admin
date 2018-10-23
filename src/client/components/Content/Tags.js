import React from 'react';
import { Tag } from 'antd';

const Tags = (props) => {
  const renderTags = () => {
    const { view } = props;
    console.log(view);
    if (view) {
      const tagsArr = Object.keys(view);
      return tagsArr.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ));
    }
  };
  return (
    <div>
      { renderTags() }
    </div>
  );
};

export default Tags;
