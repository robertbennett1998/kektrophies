import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';

const  BodyContainer = (props) =>
{
    
    return (
                <Grid container item={props.item ? true : false} xs={props.xs} sm={props.xs} md={props.xs} lg={props.xs} xl={props.xs} direction="row" spacing={2} justify="center" alignContent="stretch">
                    {props.children}                    
                </Grid>
            );
}

export default BodyContainer;