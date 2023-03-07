import { Routes, Route, Navigate } from "react-router-dom";
import React, { Component } from "react";
import { Layout } from "antd";
import Sidebar from "./components/Extras/Sidebar";
import Scene from "./components/Extras/Scene";

import "./App.css";
import TopHeader from "./components/Extras/TopHeader";
import Template from "./components/Template";
import RegisterForm from "./components/Form/RegisterForm";
import SignInForm from "./components/Form/SignInForm";
import { getUser } from "./utils/apiCall";
import { useNavigate } from 'react-router-dom';
import { openNotificationWithIcon } from "./components/Extras/Notification";
import WorkshopForm from "./components/Workshop/WorkshopForm";
const navigate = useNavigate;
// import 'antd/dist/antd.min.css'

const Profile = () => {
  return (
    <>
      <h1>Profile</h1>
      <p>Here we will give functionality to update user details</p>
      <p>Will complete this page, just need to add form and integrate with API</p>
    </>
  );
};


const routes = {
  Application: {
    iconType: "user-add",
    menuItems: [
      {
        link: "/application",
        path: "/application",
        component: <WorkshopForm/>,
        displayName: "My Application",
      },
    ],
  },
  Profile: {
    iconType: "user-add",
    menuItems: [
      {
        link: "/profile",
        path: "/profile",
        component: <Profile />,
        displayName: "Profile",
      },
    ],
  },
  Template: {
    iconType: "user-add",
    menuItems: [
      {
        link: "/template",
        path: "/template",
        component: <Template/>,
        displayName: "Template",
      },
    ],
  },
};

class App extends Component {
  state = {
      isAuthenticated : false,
      isProfileApproved : false,
      userScopes : []
  };
  setUserScopes = (role_id) => {
    const scopes = ['Profile','Template','Application'];
    // if(role_id===1 || role_id===2){
    //   scopes.push('Application');
    // }
    this.setState({
      userScopes : scopes
    })
  }
  setIsAuthenticate = () => {
    let token = localStorage.getItem("token")
    let user = localStorage.getItem("user")
    console.log(token && user)
    if(token && user) {
      console.log(user)
      getUser(user)
      .then((res) => {
        console.log(res)
        this.setState({
          isAuthenticated : true,
          isProfileApproved : res.data.user ? res.data.user.profile_approved : false
        })
        localStorage.setItem("user_doc",JSON.stringify(res.data.user))
        this.setUserScopes(res.data.user.role_id);
        navigate('/profile')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
  componentDidMount() {
    this.setIsAuthenticate();
  }
  logout = () => {
    localStorage.clear()
    this.setState({
      isAuthenticated : false,
      isProfileApproved : false,
      userScopes:  []
    })
  }
  render() {
    const internalUser = {
      scopes: this.state.userScopes,
    };
    console.log(this.state)
    const isAuthenticated = this.state.isAuthenticated;
    const isProfileApproved = this.state.isProfileApproved;
    return (
      // <h1>agraj</h1>
      <div className="App">
        { isAuthenticated && internalUser.scopes &&
        <Layout>
          <TopHeader logout={this.logout}/>
          {isProfileApproved && <Layout>
            <Sidebar routes={routes} internalUser={internalUser} />
            <Scene
              scopes={internalUser.scopes}
              routes={routes}
              location={this.props.location}
            />
          </Layout>}
        </Layout>
        } 
        <Routes>
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/profile" /> : <RegisterForm/>}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/profile" /> : <SignInForm setIsAuthenticate={this.setIsAuthenticate}/>}
          />
          <Route
            exact
            path="/"
            element={isAuthenticated ? null : <Navigate to="/login" /> }
          />
          <Route
            path="*"
            element={isAuthenticated ? null : <Navigate to="/login" /> }
          />
        </Routes>
      </div>
    );
  }
}
export default App;
