import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import Template from '../Template';

const { Content } = Layout;

class Scene extends Component {
  getRoutes = () => {
    const { scopes, routes } = this.props;
    let finalRoutes = [];
    scopes.forEach(scope => {
      finalRoutes = [
        ...finalRoutes,
        routes[scope].menuItems.map(item => (
          <Route path={item.path} key={item.path} element={item.component} />
        )),
      ];
      // if(routes[scope].managerMenuItems) {
      //   finalRoutes = [
      //     ...finalRoutes,
      //     routes[scope].managerMenuItems.map(item => (
      //       <Route path={item.path} key={item.path} element={item.component} />
      //     )),
      //   ]
      // }
    });
    return finalRoutes;
  };

  render() {
    return (
      <Layout style={{ padding: '24px 24px 24px' }}>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 'calc( 100vh - 112px)'
          }}>
          <Routes>
            {this.getRoutes()}
          </Routes>

         </Content>
       </Layout>
    );
  }
}

export default Scene;
