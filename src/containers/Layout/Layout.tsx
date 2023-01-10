import { styled } from '@mui/material/styles';
import { Container }  from '@mui/material';

import { getUserId } from '../../common/localStorage';

interface ILayout {
    /**
     * @property { React.ReactNode } children - children to embed in the container
     */
    children: React.ReactNode;
};

const StyledContainer = styled(Container)(() => ({
    backgroundColor: !!getUserId() ? "transparent" : "#F0F8FF",
}));

const Layout:React.FC<ILayout> = ({
    children,
    ...otherProps
}) => {
    return (
        <StyledContainer maxWidth = {false} disableGutters>
            {children}
        </StyledContainer>
    );
};

export default Layout;