import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Avatar, Layout, Menu } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import { ADMIN_NAVMENU_OPTIONS, COORDINATOR_NAVMENU_OPTIONS, OPEN_ROUTES, PARTICIPANT_NAVMENU_OPTIONS, ROLE_NAMES, ROUTES } from "../../utils/constants";
import { getJWTData, logout } from "../../utils/helper";

import styles from './PageLayout.module.css';
import UserProfile from '../../assets/images/profile.png';
import { useDispatch } from 'react-redux';
import { LOGOUT_ACTION_TYPE } from '../../redux/constants';

const { Sider, Content } = Layout;

const getItem = ({
    label,
    key,
    icon = null,
    danger = null,
    children = null
}) => {
    return {
      key,
      icon,
      label,
      danger,
      children
    };
}

const createMenuOptions = (options) => {
    return Object.values(options).map(navOption => { 
        const navMenu = {...navOption};
        navMenu.children = navMenu.children?.map(children => getItem({...children}));
        return getItem({...navMenu});
    });
};

const AdministratorSideMenuOptions = createMenuOptions(ADMIN_NAVMENU_OPTIONS);
const CoordinatroSideMenuOptions = createMenuOptions(COORDINATOR_NAVMENU_OPTIONS);
const ParticipantSideMenuOptions = createMenuOptions(PARTICIPANT_NAVMENU_OPTIONS);

const SideMenuOptions = () => {
    const roleName = getJWTData().role_name;
    if(roleName === ROLE_NAMES.ADMINISTRATOR)
        return AdministratorSideMenuOptions;
    else if(roleName === ROLE_NAMES.COORDINATOR)
        return CoordinatroSideMenuOptions;
    else
        return ParticipantSideMenuOptions;
};

const findOpenMenuKey = (menuItems, pathname) => {
    let menuItem = menuItems.find(item => {
        if(item.children) {
            if(item.children.find(childItem => childItem.key == pathname)){
                return true;
            }
        }
    });
    return menuItem?.key || "";
};

const PageLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const menuItems = SideMenuOptions();

    const selectedMenuKeyHandler = () => {
        if(location.pathname.includes(ROUTES.My_WORKSHOP))
            return ROUTES.My_WORKSHOP;
        else if(location.pathname.includes(ROUTES.CREATE_WORKSHOP))
            return ROUTES.CREATE_WORKSHOP;
        else if(location.pathname.includes(ROUTES.COORDINATORS))
            return ROUTES.COORDINATORS;
        else
            return location.pathname;
    }

    const [openMenuKeys, setOpenMenuKeys] = useState([findOpenMenuKey(menuItems, selectedMenuKeyHandler())]);

    const navigationChangeHandler = (event) => {
        navigate(event.key);
    };

    const onSubMenuOpenChangeHandler = (event) => {
        setOpenMenuKeys([event[1]]);
    }

    const logoutHandler = () => {
        logout(); 
        dispatch({type: LOGOUT_ACTION_TYPE});
        navigate("/login");   
    };

    return (
        <Layout style = {{minHeight: '100vh'}}>
            <Sider className = {styles['nav-bar']} width = {250}>
                <div className = {styles['profile_icon']}>
                    <Avatar src = {UserProfile} size = {128} style = {{marginBottom: '10px'}}/>
                    {getJWTData().role_name.toUpperCase()}
                </div>
                <Menu   
                    mode = "inline" 
                    className = {styles['nav-items']} 
                    theme = {"dark"} 
                    onClick = {navigationChangeHandler} 
                    items = {menuItems} 
                    selectedKeys = {[selectedMenuKeyHandler()]} 
                    openKeys = {openMenuKeys} 
                    onOpenChange = {onSubMenuOpenChangeHandler}
                />
                <Menu 
                    className = {[styles['nav-items'], styles['logout-btn']].join(' ')} 
                    theme = {"dark"} 
                    items = {[getItem({label: 'Logout', key: OPEN_ROUTES.LOGIN, icon: <LogoutOutlined />, danger: true})]} 
                    onClick = {logoutHandler} 
                    selectedKeys = {[OPEN_ROUTES.LOGIN]}
                />
            </Sider>
            <Content className = {styles.content}>
                <Outlet />
            </Content>
        </Layout>
    );
};

export default PageLayout;
