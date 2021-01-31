import React from 'react';
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import { Grid, useMediaQuery } from '@material-ui/core';

const Box = styled('div')(compose(spacing, palette));

function Header({children})
{
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down(720)); 
    return (
                <Box bgcolor="background.paper" style={{overflow: "hidden"}} marginBottom={2}>
                    <Grid container direction={isSmallScreen ? "column" : "row"} justify="space-between" alignItems="center">
                        {children}
                    </Grid>
                </Box>
            );
}

export default Header;