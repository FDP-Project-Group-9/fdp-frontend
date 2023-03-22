import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Avatar, Layout, Menu } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import { ADMIN_NAVMENU_OPTIONS, COORDINATOR_NAVMENU_OPTIONS, OPEN_ROUTES, PARTICIPANT_NAVMENU_OPTIONS, ROLE_NAMES } from "../../utils/constants";
import { getJWTData, logout } from "../../utils/helper";

import styles from './PageLayout.module.css';
import UserProfile from '../../assets/images/profile.png';

const { Sider, Content } = Layout;

const getItem = ({
    label,
    key,
    icon = null,
}) => {
    return {
      key,
      icon,
      label
    };
}

const AdministratorSideMenuOptions = Object.values(ADMIN_NAVMENU_OPTIONS).map(navOption => getItem({...navOption}));
const CoordinatroSideMenuOptions = Object.values(COORDINATOR_NAVMENU_OPTIONS).map(navOption => getItem({...navOption}));
const ParticipantSideMenuOptions = Object.values(PARTICIPANT_NAVMENU_OPTIONS).map(navOption => getItem({...navOption}));

const SideMenuOptions = () => {
    const roleName = getJWTData().role_name;
    if(roleName === ROLE_NAMES.ADMINISTRATOR)
        return AdministratorSideMenuOptions;
    else if(roleName === ROLE_NAMES.COORDINATOR)
        return CoordinatroSideMenuOptions;
    else
        return ParticipantSideMenuOptions;
};


const PageLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navigationChangeHandler = (event) => {
        navigate(event.key);
    };

    const logoutHandler = () => {
        logout(); 
        navigate("/login");   
    };

    return (
        <Layout style = {{minHeight: '100vh'}}>
            <Sider className = {styles['nav-bar']} width = {250}>
                <div className = {styles['profile_icon']}>
                    <Avatar src = {UserProfile} size = {128} style = {{marginBottom: '10px'}}/>
                    {getJWTData().role_name.toUpperCase()}
                </div>
                <Menu className = {styles['nav-items']} theme = {"dark"} onClick = {navigationChangeHandler} items = {SideMenuOptions()} selectedKeys = {[location.pathname]}/>
                <Menu className = {[styles['nav-items'], styles['logout-btn']].join(' ')} theme = {"dark"} items = {[getItem({label: 'Logout', key: OPEN_ROUTES.LOGIN, icon: <LogoutOutlined />})]} onClick = {logoutHandler} selectedKeys = {[OPEN_ROUTES.LOGIN]}/>
            </Sider>
            <Content className = {styles.content}>
                <Outlet />
            </Content>
        </Layout>
    );
};

export default PageLayout;
