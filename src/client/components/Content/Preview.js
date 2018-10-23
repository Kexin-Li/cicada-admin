import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { PropTypes } from 'prop-types';

import Settings from './Setttings';
import Tags from './Tags';
import Post from './Post';
import PostsList from './PostsList';

const { Content } = Layout;

const Preview = (props) => {
  let { posts } = props;
  const renderPosts = () => {
    switch (props.view) {
      case 'posts':
        posts = posts;
        break;
      case 'drafts':
        posts = props.drafts;
        break;
      case 'pages':
        posts = props.pages;
        break;
      case 'settings':
        posts = props.settings;
        return <Settings view={posts} />;
      case 'tags':
        posts = props.tags;
        return <Tags view={posts} />;
      case 'post':
        return <Post />;
      default:
        posts = posts;
    }
    return <PostsList view={posts} />;
  };
  return (
    <Content style={{ margin: '40px' }}>
      <div className="preview" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        { renderPosts() }
      </div>
    </Content>
  );
};

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  drafts: state.postsReducer.drafts,
  pages: state.postsReducer.pages,
  settings: state.postsReducer.settings,
  tags: state.postsReducer.tags,
  view: state.viewReducer.view
});

Preview.propTypes = {
  posts: PropTypes.string
};

Preview.defaultProps = {
  posts: {}
};

export default connect(mapStateToProps)(Preview);
