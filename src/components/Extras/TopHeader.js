import React, { Component } from "react";
import { LockOutlined } from '@ant-design/icons';
// import smallboardLogo from '../../assets/images/loginpage/logo.png';
import { Row, Col, Layout, Button } from "antd";
// import { API_URL } from "../../config/config";
// import { connect } from "react-redux";
// import { withRouter } from 'react-router-dom';

const { Header } = Layout;

class TopHeader extends Component {
  // onSignIn = () => {
  //   const CLIENT_ID = "990176758416-evg95vrgsrp9sn7mp640nae0i83c1sr1.apps.googleusercontent.com";
  //   const REDIRECT_URL = `${API_URL}/auth/login`;
  //   const SCOPE = "email";
  //   const uri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URL}&response_type=code`;
  //   window.location.replace(uri);
  // };
  render() {
    // const { isAuthenticated } = this.props;
    const isAuthenticated = true;
    return (
      <Header style={{padding: "0 12px"}}>
        <Row>
          <Col md={18}>
          <img style={{width: '60px'}} className="logo"
          src="https://aktu.ac.in/images/uptu_logo.png"
          //  src={smallboardLogo}
            alt="" />
          </Col>
          <Col md={4}>
            {isAuthenticated ? (
              <Button
                onClick={this.props.logout}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "15px",
                  background: "#EB5757",
                  color: "#ffffff",
                  borderRadius: '4px',
                  padding: "0 24px"
                }}>
                Log out
              </Button>
            ) : (
              <Button
                shape="round"
                size="default"
                // onClick={this.onSignIn}
                style={{ position: "absolute", right: 0, marginTop: "15px", paddingBottom: "4px" }}>
                <img
                  width="20px"
                  style={{ marginRight: "5px" }}
                  alt='Google "G" Logo'
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />
                Login
              </Button>
            )}
          </Col>
        </Row>
      </Header>
    );
  }
}

// const mapStateToProps = ({ authentication }) => ({
//   isAuthenticated: authentication.isAuthenticated,
//   internalUser: authentication.internalUser
// });

// export default withRouter(connect(mapStateToProps)(TopHeader));
export default TopHeader;