import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { updateView } from '../../../actions/updateView';
import { fetchPost } from '../../../actions/fetchPost';
import CardLang from './CardLang';

const PostCard = (props) => {
  const post = props.post;

  const onClickTitle = () => {
    props.updateView('post');
    props.fetchPost(post.raw_content);
  };

  const renderTitle = () => {
    if (post.title) {
      return (
        <h3
          style={{ cursor: 'pointer' }}
          onClick={onClickTitle}
        >
          { post.title }
        </h3>
      );
    }
  };

  return (
    <Card style={{ marginBottom: '20px', width: '45%' }}>
      { renderTitle() }
      { post.lang || post.date
        ? <CardLang lang={post.lang} date={post.date} />
        : ''
      }
    </Card>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateView,
  fetchPost
}, dispatch);

export default connect(null, mapDispatchToProps)(PostCard);
