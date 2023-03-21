import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Layout, Menu } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CustomTrigger from './components/CustomTrigger/CustomTrigger';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Sidebar extends Component {
  state = {
    collapsed: false
  };

//   changeCollapse = isCollapsed => {
//     this.setState(prev => {
//       if (!isCollapsed) {
//         prev.collapsed = !prev.collapsed;
//       } else {
//         prev.collapsed = isCollapsed;
//       }
//       return prev;
//     });
//   };

  selectedKeys = () => {
    const { routes, internalUser } = this.props;
    const { scopes, isManager, type } = internalUser;
    const path = window.location.pathname;
    let selected = [];
    let flag = false;
    for (let scope of scopes) {
      for (let item of routes[scope].menuItems) {
        if (path.indexOf(item.link) > -1) {
          selected.push(item.link);
          flag = true;
          break;
        }
      }
      if (flag) break;
    }
    return selected;
  };

  render() {
    const { collapsed } = this.state;
    const { internalUser, routes } = this.props;
    const { scopes, isManager, type } = internalUser;
    return (
      <Sider
        width={220}
        style={{ background: '#fff', zIndex: 1, position: 'reletive', }}
        collapsible={true}
        collapsed={collapsed}
        // onCollapse={this.changeCollapse}
        theme="dark"
        trigger={<CustomTrigger collapsed={collapsed} />}
        >
        <Menu
          mode="inline"
          theme="dark"
          style={{ height: '100%', borderRight: 0, overflow: 'auto' }}
          // selectedKeys={this.selectedKeys()}
        >
          {scopes.map(scope => {
            const route = routes[scope];
            return route.menuItems.length === 1 ? (
              <Menu.Item key={route.menuItems[0].link}>
                <Link to={route.menuItems[0].link}>
                  <LegacyIcon type={route.iconType} />
                  <span>{route.menuItems[0].displayName}</span>
                </Link>
              </Menu.Item>
            ) : (
              <SubMenu
                key={scope}
                title={
                  <span>
                    <LegacyIcon type={route.iconType} />
                    <span>{scope}</span>
                  </span>
                }>
                {route.menuItems.map(item => {
                  return (
                    <Menu.Item key={item.link}>
                      <Link to={item.link}>
                        <span>{item.displayName}</span>
                      </Link>
                    </Menu.Item>
                  );
                })}
                {
                  route.managerMenuItems && route.managerMenuItems.map(item => {
                    return (
                      <Menu.Item key={item.link}>
                        <Link to={item.link}>
                          <span>{item.displayName}</span>
                        </Link>
                      </Menu.Item>
                    );
                  })
                }
              </SubMenu>
            );
          })}
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
