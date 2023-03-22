import { Outlet, Navigate } from 'react-router-dom';
import { OPEN_ROUTES } from '../utils/constants';
import { isLoggedIn } from '../utils/helper';

const AuthRoute = () => {
    if(isLoggedIn()) {
        return <Outlet />;
    }
    else{
        return <Navigate to = {OPEN_ROUTES.LOGIN} />;
    }
};

export default AuthRoute;