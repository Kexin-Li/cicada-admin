import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import DeployBtn from './Header/DeployBtn';
import SideBar from './SideBar/SideBar';
import Preview from './Content/Preview';
import Footer from './Footer/Footer';

import { fetchPosts } from '../actions/fetchPosts';
import './App.css';

const { Header } = Layout;

class App extends Component {
  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <DeployBtn />
          </Header>
          <Preview />
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

App.propTypes = {
  fetchPosts: PropTypes.func
};

App.defaultProps = {
  fetchPosts
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPosts
}, dispatch);

export default connect(null, mapDispatchToProps)(App);
