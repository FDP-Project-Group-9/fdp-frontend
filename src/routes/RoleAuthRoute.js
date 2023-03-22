import { Outlet, Navigate } from 'react-router-dom';
import { OPEN_ROUTES } from '../utils/constants';
import { getJWTData } from '../utils/helper';

const RoleAuthRoute = ( {roleName} ) => {
    if(roleName == getJWTData().role_name) {
        return <Outlet />;
    }
    else{
        return <Navigate to = {OPEN_ROUTES.LOGIN} />;
    }
};

export default RoleAuthRoute;