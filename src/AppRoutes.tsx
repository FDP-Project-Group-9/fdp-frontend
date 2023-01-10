import { Routes, Route } from 'react-router-dom';

import Signup from './containers/Signup/Signup';

const AppRoutes = () => {
    return (
        <Routes>
                <Route path = "/login" element = {<div>login page</div>} />
                <Route path = "/signup" element = {<Signup />} />
                <Route path = "/" element = {<div>home</div>} />
        </Routes>
    );
};

export default AppRoutes;