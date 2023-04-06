        import { Route, Routes, Navigate } from 'react-router-dom';

import RegisterForm from '../components/UserManagement/RegisterForm';
import SignInForm from '../components/UserManagement/SignInForm';
import PageLayout from '../components/Layout/PageLayout';

import { ADMIN_ROUTES, OPEN_ROUTES, ROLE_NAMES, ROUTES } from '../utils/constants';
import AuthRoute from './AuthRoute';
import RoleAuthRoute from './RoleAuthRoute';

import CoordinatorSignupDocs from '../components/UserManagement/CoordinatorSignupDocs/CoordinatorSignupDocs';
import Profile from '../components/UserManagement/Profile/Profile';
import CoordinatorWorkshops from '../components/Workshop/CoordinatorWorkshops/CoordinatorWorkshops';
import WorkshopForm from '../components/Workshop/CreateWorkshop/WorkshopForm';
import CreateWorkshopContainer from '../components/Workshop/CreateWorkshop/CreateWorkshopContainer';
import CreateWorkshopInit from '../components/Workshop/CreateWorkshop/CreateWorkshopInit';
import ListCoordinators from '../components/UserManagement/ListCoordinators/ListCoordinators';
import CoordinatorProfile from '../components/UserManagement/ListCoordinators/CoordinatorProfile/CoordinatorProfile';
import AllWorkshops from '../components/Workshop/AllWorkshops/AllWorkshops';
import WorkshopDetails from '../components/Workshop/WorkshopDetails/WorkshopDetails';
import DetailsContainer from '../components/Workshop/CoordinatorWorkshopDetails/DetailsContainer';

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path = {OPEN_ROUTES.LOGIN} element = {<SignInForm />} />
            <Route path = {OPEN_ROUTES.SIGNUP} element = {<RegisterForm />} />
            <Route path = {OPEN_ROUTES.UPLOAD_DOCS} element = {<CoordinatorSignupDocs />} />
            <Route element = {<AuthRoute />}>
                <Route element = {<PageLayout />}>
                    {/* ADMINISTRATOR ROUTES */}
                    <Route path = {ROUTES.ALL_WORKSHOPS}>
                        <Route path = {":workshopId"} element = {<WorkshopDetails />} />
                        <Route path = {OPEN_ROUTES.PARENT_ROUTE} element = {<AllWorkshops />} />
                    </Route>
                    <Route path = {ROUTES.MY_PROFILE} element = {<Profile />} />

                    <Route element = {<RoleAuthRoute roleName = {ROLE_NAMES.ADMINISTRATOR}/>}>
                        <Route path = {ROUTES.COORDINATORS}>
                            <Route path = {":coordinatorId"} element = {<CoordinatorProfile />} />
                            <Route path = {OPEN_ROUTES.PARENT_ROUTE} element = {<ListCoordinators />} />
                        </Route>
                    </Route>
                    {/* COORDINATOR ROUTES */}
                    <Route element = {<RoleAuthRoute roleName = {ROLE_NAMES.COORDINATOR}/>}>
                            <Route path = {ROUTES.MY_WORKSHOP}>
                                <Route element = {<DetailsContainer />}>
                                    <Route path = {":workshopId"} element = {<WorkshopDetails coordinatorWorkshop = {true}/>} />
                                    <Route path = {ROUTES.PARTICIPANTS + "/:workshopId"} element = {<h1>Participants</h1>}/>
                                    <Route path = {ROUTES.QUIZ + "/:workshopId"} element = {<h1>Quiz</h1>}/>
                                </Route>
                                <Route path = {OPEN_ROUTES.PARENT_ROUTE} element = {<CoordinatorWorkshops />} />
                            </Route>
                            <Route path = {ROUTES.CREATE_WORKSHOP} element = {<CreateWorkshopContainer />}>
                                <Route path = {":workshopId"} element = {<WorkshopForm />} />
                                <Route path = {OPEN_ROUTES.PARENT_ROUTE} element = {<CreateWorkshopInit />} />
                            </Route>
                            <Route path = {ROUTES.RESOURCE_PERSON} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.PARTICIPANTS} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.FEEDBACK} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.CERTIFICATE} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.ATTENDANCE} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.MANDATE_DOCS} element = {<h1>fewffef</h1>} />
                            <Route path = {ROUTES.FINANCES} element = {<h1>fewffef</h1>} />
                        {/* </Route> */}
                    </Route>
                    {/* PARTICIPANT ROUTES */}
                    <Route element = {<RoleAuthRoute roleName = {ROLE_NAMES.PARTICIPANT}/>}>
                    </Route>
                </Route>
                <Route path = {OPEN_ROUTES.NO_MATCH} element = {<Navigate to = {ROUTES.ALL_WORKSHOPS}/>} />
            </Route>
            <Route path = {OPEN_ROUTES.NO_MATCH} element = {<Navigate to = {OPEN_ROUTES.LOGIN}/>}/>
        </Routes>
    );
};

export default AppRoutes;