  
import { Grid, Paper } from '@material-ui/core';
import React from 'react';

const BodyItem = ({children, xs, sm, md, lg, xl, paper, fill}) =>
{    
    if (paper)
    {
        return (    
                    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
                        <Paper variant="elevation" style={{padding: 16, width: "100%", display: 'flex', justifyContent: 'flex-start', height: fill ? "100%" : undefined, flexDirection: 'column', overflowX: "hidden", overflowY: "auto"}}>
                            {children}
                        </Paper>
                    </Grid>
                );
    }
    else
    {
        return (    
            <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
                {children}
            </Grid>
        );
    }
}

export default BodyItem;