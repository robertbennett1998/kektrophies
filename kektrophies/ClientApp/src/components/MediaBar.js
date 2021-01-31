import React from 'react';
import { ButtonGroup, Grid, IconButton, useMediaQuery } from '@material-ui/core';

function MediaBar({icons}) {
    var buttons = [];
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
    
    for (const icon in icons)
    {
        buttons.push(<IconButton size={isSmallScreen ? "small" : "large"} onClick={icons[icon].action} key={icon}>{icons[icon].icon()}</IconButton>)
    }
    
    return (
                <Grid container item justify="center" alignItems="center" xs={12} sm={12} md={2}>
                    <ButtonGroup size={isSmallScreen ? "small" : "large"} fullWidth="true" variant="text" aria-label="text primary button group" style={{ justifyContent: "center" }}>
                        {buttons}
                    </ButtonGroup>
                </Grid>
            );
}

export default MediaBar;