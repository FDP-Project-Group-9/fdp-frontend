import {
    TypographyProps
} from '@mui/material';

export interface StyledTypographyProps extends TypographyProps{
    styles: {
        color?: string;
        fontSize?: number;
        fontWeight?: number;
        lineHeight?: number,
        marginBottom?: number
    }
};