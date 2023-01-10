import { 
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Box,
    Grid
}from '@mui/material';
import { Typography } from '../common/StyledComponents';
import { useTheme } from '@mui/material/styles';

import{ ManageAccounts as ManageAccountsIcon } from '@mui/icons-material';

import { FunctionType } from '../../common/Types'

interface ISignupForm {
    /**
     * @property { string } userRole - role of the user ex:- co-ordinator
     */
    userRole: string;
    /**
     * @property { FunctionType } userRoleChangeHandler - handler function for user role
     */
    userRoleChangeHandler: FunctionType;
    /**
     * @property { FunctionType } onSubmitHandler - handler function for submiting form
     */
    onSubmitHandler: FunctionType;
};

const SignupForm: React.FC<ISignupForm> = ({
    userRole, 
    userRoleChangeHandler,
    onSubmitHandler,
    ...otherProps
}) => {
    const theme = useTheme();
    console.log(theme, 'consoling theme');
    return (
        <Box component = "div">
            <Typography variant = {"h4"} align = {"left"} color = {theme.additionalColors.heading}>
                Welcome...
            </Typography>
            <Box component = "form" onSubmit = {onSubmitHandler}>
                <Grid container columnSpacing={2}>
                    <Grid item xs = {6}>
                        <FormControl fullWidth variant='standard'>
                            <InputLabel id = "role-select-field">
                                <Box sx = {{display: "flex", alignContent: "center"}}>
                                    <ManageAccountsIcon />
                                    <Typography fontSize = {13} alignItems = {"center"} lineHeight = {2}>
                                        Select Role
                                    </Typography>
                                </Box>
                            </InputLabel>
                            <Select
                                labelId = 'role-select-field'
                                label = "Select Role"
                                value = {userRole}
                                onChange = {userRoleChangeHandler}
                                
                            >
                                <MenuItem value = "Coordinator">Coordinator</MenuItem>
                                <MenuItem value = "Co-coordinator">Co-coordinator</MenuItem>
                                <MenuItem value = "Participant">Participant</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs = {6}>
                        <FormControl fullWidth variant='standard'>
                            <InputLabel id = "role-select-field">Select Role</InputLabel>
                            <Select
                                labelId = 'role-select-field'
                                label = "Select Role"
                                value = {userRole}
                                onChange = {userRoleChangeHandler}
                                
                            >
                                <MenuItem value = "Coordinator">Coordinator</MenuItem>
                                <MenuItem value = "Co-coordinator">Co-coordinator</MenuItem>
                                <MenuItem value = "Participant">Participant</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default SignupForm;