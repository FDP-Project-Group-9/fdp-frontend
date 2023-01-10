import { Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import type {
    StyledTypographyProps
} from './StyledType';
import { UniversalObjectType } from '../../common/Types';

//custom styled Typography component
const StyledTypography = styled(Typography)<StyledTypographyProps>((props) => {
    let optionalStyles: UniversalObjectType = {};

    if(props.styles){
        optionalStyles = {...optionalStyles, ...props.styles};
    }   

    return {
        ...optionalStyles
    };
});

export {
    StyledTypography as Typography
};