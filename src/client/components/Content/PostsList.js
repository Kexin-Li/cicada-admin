import React from 'react';
import { List } from 'antd';
import format from 'date-fns/format';
import { PropTypes } from 'prop-types';

const PostsList = (props) => {
  const { view } = props;

  return (
    <List
      itemLayout="horizontal"
      dataSource={view}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={<a href="https://ant.design">{ item.title }</a>}
            description={format(item.date, 'YYYY-MM-DD')}
          />
        </List.Item>
      )}
    />
  );
};

PostsList.propTypes = {
  view: PropTypes.arrayOf()
};

PostsList.defaultProps = {
  view: []
};

export default PostsList;
