import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import type {
    StyledTypographyProps
} from './StyledType';
import { UniversalObjectType } from '../../common/Types';

//custom styled Typography component
const StyledTypography = styled(Typography)<StyledTypographyProps>((props) => {
    const optionalStyles: UniversalObjectType = {};

    if(props.fontSize)
        optionalStyles['fontSize'] = props.fontSize;

    if(props.color)
        optionalStyles['color'] = props.color;

    return {
        ...optionalStyles
    };
});

export {
    StyledTypography as Typography
};