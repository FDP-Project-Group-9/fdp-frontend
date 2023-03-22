import { Route, Routes, Navigate } from 'react-router-dom';

import RegisterForm from '../components/Form/RegisterForm';
import SignInForm from '../components/Form/SignInForm';
import PageLayout from '../components/Layout/PageLayout';

import { ADMIN_ROUTES, OPEN_ROUTES, ROLE_NAMES, COORDINATOR_ROUTES } from '../utils/constants';
import AuthRoute from './AuthRoute';
import RoleAuthRoute from './RoleAuthRoute';

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path = {OPEN_ROUTES.LOGIN} element = {<SignInForm />} />
            <Route path = {OPEN_ROUTES.SIGNUP} element = {<RegisterForm />} />
            <Route element = {<AuthRoute />}>
                <Route element = {<PageLayout />}>
                    {/* ADMINISTRATOR ROUTES */}
                    <Route element = {<RoleAuthRoute roleName = {ROLE_NAMES.ADMINISTRATOR}/>}>
                        {/* <Route element = {<AdminRoutes />} /> */}
                    </Route>
                    {/* COORDINATOR ROUTES */}
                    <Route element = {<RoleAuthRoute roleName = {ROLE_NAMES.COORDINATOR}/>}>
                        <Route path = {COORDINATOR_ROUTES.BASE}>
                            <Route path = {COORDINATOR_ROUTES.DASHBOARD} element = {<h1 style = {{height: "200vh"}}>ffewfwewf</h1>} />
                            <Route path = {COORDINATOR_ROUTES.PROFILE} element = {<h1>fewffef</h1>} />
                        </Route>
                    </Route>
                    {/* PARTICIPANT ROUTES */}
                    <Route element = {<RoleAuthRoute roleName = {ROLE_NAMES.PARTICIPANT}/>}>
                        {/* <Route element = {<ParticipantRoutes />} /> */}
                    </Route>
                </Route>
            </Route>
            <Route path = {OPEN_ROUTES.NO_MATCH} element = {<Navigate to = {OPEN_ROUTES.LOGIN}/>}/>
        </Routes>
    );
};

export default AppRoutes;