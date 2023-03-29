import { Route, Routes, Navigate } from 'react-router-dom';

import RegisterForm from '../components/UserManagement/RegisterForm';
import SignInForm from '../components/UserManagement/SignInForm';
import PageLayout from '../components/Layout/PageLayout';

import { ADMIN_ROUTES, OPEN_ROUTES, ROLE_NAMES, ROUTES } from '../utils/constants';
import AuthRoute from './AuthRoute';
import RoleAuthRoute from './RoleAuthRoute';
import { getJWTData, isLoggedIn } from '../utils/helper';
import CoordinatorSignupDocs from '../components/UserManagement/CoordinatorSignupDocs/CoordinatorSignupDocs';
import Profile from '../components/UserManagement/Profile/Profile';
import CoordinatorWorkshops from '../components/Workshop/CoordinatorWorkshops/CoordinatorWorkshops';

const AppRoutes = (props) => {
    const roleName = isLoggedIn() ? getJWTData().role_name : "";
    return (
        <Routes>
            <Route path = {OPEN_ROUTES.LOGIN} element = {<SignInForm />} />
            <Route path = {OPEN_ROUTES.SIGNUP} element = {<RegisterForm />} />
            <Route path = {OPEN_ROUTES.UPLOAD_DOCS} element = {<CoordinatorSignupDocs />} />
            <Route element = {<AuthRoute />}>
                <Route element = {<PageLayout />}>
                    {/* ADMINISTRATOR ROUTES */}
                    <Route element = {<RoleAuthRoute roleName = {ROLE_NAMES.ADMINISTRATOR}/>}>
                        {/* <Route element = {<AdminRoutes />} /> */}
                    </Route>
                    {/* COORDINATOR ROUTES */}
                    <Route element = {<RoleAuthRoute roleName = {ROLE_NAMES.COORDINATOR}/>}>
                        {/* <Route path = {ROUTES.BASE}> */}
                            <Route path = {ROUTES.ALL_WORKSHOPS} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.My_WORKSHOP}>
                                <Route path = {":workshopId"} element = {<h1>hi</h1>} />
                                <Route path = {""} element = {<CoordinatorWorkshops />} />
                            </Route>
                            <Route path = {ROUTES.CREATE_WORKSHOP} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.RESOURCE_PERSON} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.PARTICIPANTS} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.FEEDBACK} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.CERTIFICATE} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.ATTENDANCE} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.MY_PROFILE} element = {<Profile />} />
                            <Route path = {ROUTES.MANDATE_DOCS} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.FINANCES} element = {<h1>fewffef</h1>} />
                        {/* </Route> */}
                    </Route>
                    {/* PARTICIPANT ROUTES */}
                    <Route element = {<RoleAuthRoute roleName = {ROLE_NAMES.PARTICIPANT}/>}>
                        {/* <Route element = {<ParticipantRoutes />} /> */}
                    </Route>
                </Route>
                <Route path = {OPEN_ROUTES.NO_MATCH} element = {<Navigate to = {ROUTES.ALL_WORKSHOPS}/>} />
            </Route>
            <Route path = {OPEN_ROUTES.NO_MATCH} element = {<Navigate to = {OPEN_ROUTES.LOGIN}/>}/>
        </Routes>
    );
};

export default AppRoutes;