import { useState } from 'react';

import signupImage from '../../assets/images/signup.jpg';

import SignupForm from "../../components/SignupForm/signupForm";
import { 
    Grid, 
    Paper, 
    SelectChangeEvent
} from '@mui/material';

import { FunctionType } from '../../common/Types';

interface ISignup {
    [key: string]: string | FunctionType | number | boolean;
};

const Signup:React.FC<ISignup> = (props) => {
    const [userRole, setUserRole] = useState<string>("");
    const userRoleChangeHandler = ( event: SelectChangeEvent ) => {
        console.log(event.target, 'consoling user role');
        setUserRole(event.target.value);
    };
    return (
        <Grid container alignContent={"center"} justifyContent = {"center"} sx = {{height: "100vh"}}>
            <Grid xs = {10} item justifyContent = {"space-around"} sx = {{height: "90%", padding: "0px 24px"}}>
                <Paper sx = {{height: "100%", borderRadius: "8px",}} elevation = {2}>
                    <Grid container sx = {{ height: "100%", borderRadius: "8px" }}>
                        <Grid item xs = {6} sx = {{height: "100%", borderRadius: "8px 0px 0px 8px", padding: "24px"}}>
                            <SignupForm userRole = {userRole} userRoleChangeHandler = {userRoleChangeHandler} onSubmitHandler = {console.log}/>
                        </Grid>
                        <Grid item xs = {6} sx = {{height: "100%"}}>
                            <img src = {signupImage} style = {{height: "100%", width: "100%", borderRadius: "0px 8px 8px 0px"}}/>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Signup;