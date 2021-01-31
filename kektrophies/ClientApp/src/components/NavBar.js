import React from 'react';
import { Button, ButtonGroup, Grid, useMediaQuery } from '@material-ui/core';

function NavBar({links, buttonVariant, buttonColour}) {
    var buttons = [];
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
    
    for (const link in links)
    {
        buttons.push(<Button size={isSmallScreen ? "small" : "large"} onClick={links[link].action} key={link} variant={buttonVariant} color={buttonColour}>{link.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</Button>)
    }
    
    return (
                <Grid container item justify="center" alignItems="center" xs={12} sm={12} md={7}>
                    <ButtonGroup orientation={isSmallScreen ? "vertical" : "horizontal"} size={isSmallScreen ? "small" : "large"} fullWidth="true" variant="text" aria-label="text primary button group">
                        {buttons}
                    </ButtonGroup>
                </Grid>
            );
}

export default NavBar;