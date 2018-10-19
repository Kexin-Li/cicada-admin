import React from 'react';
import { List } from 'antd';
import format from 'date-fns/format';

const PostsList = (props) => {
  const data = props.view;

  return (
    <List
      itemLayout='horizontal'
      dataSource={ data }
      renderItem={item => (
        <List.Item>
          <List.Item.Meta 
            title={ <a href="https://ant.design">{ item.title }</a> }
            description={ format(item.date, 'YYYY-MM-DD') }
          />
        </List.Item>
      )}
    />
  );
};

export default PostsList;