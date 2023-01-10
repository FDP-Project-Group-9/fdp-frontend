import { 
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Box,
    Grid,
    TextField,
    InputAdornment,
    FormHelperText
}from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@mui/material/styles';
import { Dayjs } from 'dayjs';
import { Typography } from '../common/StyledComponents';

import{ ManageAccounts as ManageAccountsIcon, Save as SaveIcon, Send as SendIcon } from '@mui/icons-material';

import { FunctionType } from '../../common/Types'
import { useFormValidation } from '../../hooks/useFormValidation';
import { useEffect } from 'react';

type userDetailsType = {
    /**
     * @property { string } userRole - role of the user ex:- co-ordinator
     */
    userRole: string;
    /**
     * @property { FunctionType } userRoleChangeHandler - handler function for user role
     */
    userRoleChangeHandler: FunctionType;
    /**
     * @property { string } userTitle - title for the user 
     */
    userTitle: string;
    /**
     * @property { FunctionType } userTitleChangeHandler - handler function for user title
     */
    userTitleChangeHandler: FunctionType;
    /**
     * @property { string } userName - user name
     */
    userName: string;
    /**
     * @property { FunctionType } userNameChangeHandler - handler function for user name
     */
    userNameChangeHandler: FunctionType;
    /**
     * @property { Dayjs | null } userDOB - user date of birth
     */
    userDOB: Dayjs | null;
    /**
     * @property { FunctionType } userDOBChangeHandler - handler function for user dob
     */
    userDOBChangeHandler: FunctionType;
    /**
     * @property { string } userGender - gender of user
     */
    userGender: string;
    /**
     * @property { FunctionType } userGenderChangeHandler - handler function for user gender
     */
    userGenderChangeHandler: FunctionType;
    /**
     * @property { string } userEmail - email of user
     */
    userEmail: string;
    /**
     * @property { FunctionType } userEmailChangeHandler - handler function for user email
     */
    userEmailChangeHandler: FunctionType;
    /**
     * @property { string } userMobileNo - mobile number of user
     */
    userMobileNo: string | number;
    /**
     * @property { FunctionType } userMobileNoChangeHandler - handler function for user mobile number
     */
    userMobileNoChangeHandler: FunctionType;
    /**
     * @property { string } userPassword - password of user
     */
    userPassword: string;
    /**
     * @property { FunctionType } userPasswordChangeHandler - handler function for user password
     */
    userPasswordChangeHandler: FunctionType;
    /**
     * @property { string } userConfirmPassword - confirm password of user
     */
    userConfirmPassword: string | number;
    /**
     * @property { FunctionType } userConfirmPasswordChangeHandler - handler function for user confirm password
     */
    userConfirmPasswordChangeHandler: FunctionType;
};

interface ISignupForm {
    /**
     * @property { userDetailsType } userDetails - user details for form
     */
    userDetails: userDetailsType;
    /**
     * @property { boolean } loading - whether the form has been sumbited and is waiting for response
     */
    loading: boolean;
    /**
     * @property { FunctionType } onSubmitHandler - handler function for submiting form
     */
    onSubmitHandler: FunctionType;
};

const SignupForm: React.FC<ISignupForm> = ({
    userDetails,
    loading,
    onSubmitHandler,
}) => {
    const theme = useTheme();
    const {
        userRole, 
        userTitle,
        userName,
        userDOB,
        userGender,
        userEmail,
        userMobileNo,
        userPassword,
        userConfirmPassword,
        userRoleChangeHandler,
        userTitleChangeHandler,
        userNameChangeHandler,
        userDOBChangeHandler,
        userGenderChangeHandler,
        userEmailChangeHandler,
        userMobileNoChangeHandler,
        userPasswordChangeHandler,
        userConfirmPasswordChangeHandler
    } = userDetails;

    const { registerFields, fieldRules } = useFormValidation();
    useEffect(() => {
        registerFields([{fieldName: "role", rules: {required: true}}, {fieldName: "name", rules: {required: true, maxLength: 30}}]);
    }, []);
    console.log(theme, 'consoling theme');
    return (
        <Box sx = {{marginTop: "32px"}}>
            <Typography variant = {"h4"} align = {"left"} 
                styles = {{
                            color: theme.additionalColors.heading, 
                            fontWeight: 700, 
                            marginBottom: 16
                        }}
            >
                Sign Up
            </Typography>
            <Box component = "form" onSubmit = {onSubmitHandler}>
                <Grid container columnSpacing={2} rowSpacing = {1.5}>
                    <Grid item xs = {6}>
                        <FormControl fullWidth variant='standard'>
                            <InputLabel id = "role-select-field">
                                <Box sx = {{display: "flex", alignContent: "center"}}>
                                    <ManageAccountsIcon />
                                    <Typography alignItems = {"center"} styles = {{fontSize: 13, lineHeight: 2}}>
                                        Select Role
                                    </Typography>
                                </Box>
                            </InputLabel>
                            <Select
                                labelId = 'role-select-field'
                                label = "Select Role"
                                value = {userRole}
                                onChange = {userRoleChangeHandler}
                                error = {fieldRules["role"]?.errors?.length > 0}
                            >
                                <MenuItem value = "Coordinator">Coordinator</MenuItem>
                                <MenuItem value = "Co-coordinator">Co-coordinator</MenuItem>
                                <MenuItem value = "Participant">Participant</MenuItem>
                            </Select>
                            <FormHelperText sx = {{color: theme.palette.error.main}}>
                                {fieldRules["role"]?.errors?.join(" ")}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs = {6}>
                        <FormControl fullWidth variant='standard'>
                            <InputLabel id = "title-select-field">Select Title</InputLabel>
                            <Select
                                labelId = 'title-select-field'
                                label = "Select Title"
                                value = {userTitle}
                                onChange = {userTitleChangeHandler}
                                error = {fieldRules["role"]?.errors?.length > 0}
                            >
                                <MenuItem value = "Dr">Dr</MenuItem>
                                <MenuItem value = "Mr">Mr</MenuItem>
                                <MenuItem value = "Ms">Ms</MenuItem>
                            </Select>
                            <FormHelperText sx = {{color: theme.palette.error.main}}>
                                {fieldRules["role"]?.errors?.join(" ")}
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs = {12}>   
                        <FormControl fullWidth>
                            <TextField
                                label = "Name" 
                                variant = "standard" 
                                value = {userName} 
                                onChange = {userNameChangeHandler}
                                placeholder = {"Shashank Agarwal"}
                                error = {fieldRules["name"]?.errors?.length > 0}
                                helperText = {fieldRules["name"] ? fieldRules["name"]?.errors.join(' '): ""}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs = {6}>
                        <FormControl fullWidth sx = {{position: "relative", top: "4px"}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date Of Birth"
                                    value={userDOB}
                                    onChange = {(newValue) => {
                                        userDOBChangeHandler(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} variant = {"standard"} error = {fieldRules["role"]?.errors?.length > 0}
                                    helperText = {fieldRules["name"] ? fieldRules["name"]?.errors.join(' '): ""}/>}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs = {6}>
                        <FormControl fullWidth variant = "standard">
                            <InputLabel id = "gender-select-field">Gender</InputLabel>
                            <Select
                                labelId = 'gender-select-field'
                                label = "Gender"
                                value = {userGender}
                                onChange = {userGenderChangeHandler}                
                            >
                                <MenuItem value = "male">Male</MenuItem>
                                <MenuItem value = "female">Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs = {12}>
                        <FormControl fullWidth>
                            <TextField 
                                type = {"email"} 
                                label = {"Email"} 
                                value = {userEmail} 
                                variant = {"standard"} 
                                onChange = {userEmailChangeHandler} 
                                placeholder = {"xyz@email.com"}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs = {12}>
                        <FormControl fullWidth>
                            <TextField 
                                type = {"number"} 
                                label = {"Mobile Number"} 
                                value = {userMobileNo} 
                                variant = {"standard"} 
                                onChange = {userMobileNoChangeHandler} 
                                placeholder = {"9876503214 "}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                                  }}
                            />
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs = {12}>
                        <FormControl fullWidth>
                            <TextField 
                                type = {"password"} 
                                label = {"Password"} 
                                value = {userPassword} 
                                variant = {"standard"} 
                                onChange = {userPasswordChangeHandler} 
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs = {12}>
                        <FormControl fullWidth>
                            <TextField 
                                type = {"password"} 
                                label = {"Confirm Password"} 
                                value = {userConfirmPassword} 
                                variant = {"standard"} 
                                onChange = {userConfirmPasswordChangeHandler} 
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs = {12} sx = {{marginTop: "20px"}}>
                        <FormControl fullWidth>
                            <LoadingButton
                                onClick={onSubmitHandler}
                                endIcon={<SendIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                >
                                <span>Sign Up</span>
                            </LoadingButton>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default SignupForm;