import { useState } from 'react';

import signupImage from '../../assets/images/signup.jpg';

import SignupForm from "../../components/SignupForm/signupForm";
import { 
    Grid, 
    Paper, 
    SelectChangeEvent,
} from '@mui/material';
import { Dayjs } from 'dayjs';

import { FunctionType } from '../../common/Types';
import axios from 'axios';

interface ISignup {
    [key: string]: string | FunctionType | number | boolean;
};

const Signup:React.FC<ISignup> = (props) => {
    const [userRole, setUserRole] = useState<string>("");
    const [userTitle, setUserTitle] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [userDOB, setUserDOB] = useState<Dayjs | null>(null);
    const [userGender, setUserGender] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userMobileNo, setUserMobileNo] = useState<string | number>("");
    const [userPassword, setUserPasswod] = useState<string>("");
    const [userConfirmPassword, setUserConfirmPasswod] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    console.log(userDOB?.format('DD/MM/YYYY').toString(), 'consoling user dob');

    const handlerSelector = (type: string) => {
        switch(type) {
            case "role": return ( event: SelectChangeEvent ) => setUserRole(event.target.value);
            case "title": return ( event: SelectChangeEvent) => setUserTitle(event.target.value);
            case "name": return (event: any) => setUserName(event.target?.value);
            case "gender": return (event: SelectChangeEvent) => setUserGender(event.target.value);
            case "email": return (event: any) => setUserEmail(event.target.value);
            case "mobile-no": return (event: any) => setUserMobileNo(event.target.value);
            case "password": return (event: any) => setUserPasswod(event.target.value);
            case "confirm-password": return (event: any) => setUserConfirmPasswod(event.target.value);
            default: return () => console.error("choose a valid type of selector");
        };
    };
    
    const onSubmitHandler = async () => {
        const requestData = {
            role: userRole,
            title: userTitle,
            name: userName,
            gender: userGender,
            email: userEmail,
            mobno: userMobileNo,
            dob: userDOB,
            password: userPassword
        };

        setLoading(true);
        try{
            const resp = await axios.post("http://localhost:5000/api/users/register", requestData);
            console.log(resp, 'consoling response');
        }
        catch(err){
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <Grid container alignContent={"center"} justifyContent = {"center"} sx = {{height: "100vh"}}>
            <Grid xs = {10} item justifyContent = {"space-around"} sx = {{height: "90%", padding: "0px 24px"}}>
                <Paper sx = {{height: "100%", borderRadius: "8px",}} elevation = {2}>
                    <Grid container sx = {{ height: "100%", borderRadius: "8px" }}>
                        <Grid item xs = {6} sx = {{height: "100%", borderRadius: "8px 0px 0px 8px", padding: "24px 96px"}}>
                            <SignupForm 
                                userDetails = {{
                                    userRole: userRole,
                                    userTitle: userTitle,
                                    userName: userName, 
                                    userDOB: userDOB,
                                    userGender: userGender,
                                    userEmail: userEmail,
                                    userMobileNo: userMobileNo,
                                    userPassword: userPassword,
                                    userConfirmPassword: userConfirmPassword,
                                    userRoleChangeHandler: handlerSelector("role"),
                                    userNameChangeHandler: handlerSelector("name"),
                                    userTitleChangeHandler: handlerSelector("title"),
                                    userDOBChangeHandler: setUserDOB,
                                    userGenderChangeHandler: handlerSelector("gender"),
                                    userEmailChangeHandler: handlerSelector("email"),   
                                    userMobileNoChangeHandler: handlerSelector("mobile-no"),
                                    userPasswordChangeHandler: handlerSelector("password"),
                                    userConfirmPasswordChangeHandler: handlerSelector("confirm-password"),
                                }}
                                loading = {loading}
                                onSubmitHandler = {onSubmitHandler}
                            />
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