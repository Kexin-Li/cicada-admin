import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

// import Posts from './Posts';
import Settings from './Setttings';
import Tags from './Tags';
import Post from './Post';
import PostsList from './PostsList';

const { Header, Content } = Layout;

const Preview = (props) => {
  let data = props.posts;
  const renderPosts = () => {
    switch(props.view) {
      case 'posts':
        data = props.posts;
        break;
      case 'drafts':
        data = props.drafts;
        break;
      case 'pages':
        data = props.pages;
        break;
      case 'settings':
        data = props.settings;
        return <Settings view={ data } />;
      case 'tags':
        data = props.tags;
        return <Tags view={ data } />;
      case 'post':
        return <Post />;
      default:
        data = props.posts;
    }
    return <PostsList view={ data } />;
  };
  return (
    <Content style={{ margin: '40px' }}>
      <div className='preview' style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        { renderPosts() }
      </div>
    </Content>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer.posts,
    drafts: state.postsReducer.drafts,
    pages: state.postsReducer.pages,
    settings: state.postsReducer.settings,
    tags: state.postsReducer.tags,
    view: state.viewReducer.view
  };
};

export default connect(mapStateToProps)(Preview);