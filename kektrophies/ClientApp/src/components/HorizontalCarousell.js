import React, { useEffect, useState } from 'react';
import withWidth from '@material-ui/core/withWidth';
import { IconButton } from '@material-ui/core';
import BodyContainer from './BodyContainer';
import BodyItem from './BodyItem';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const HorizontalCarousell = React.memo((props) => {  
    const [startIndex, _setStartIndex] = useState(0);
    const [maxItemsToDisplay, _setMaxItemsToDisplay] = useState(0);

    //console.log(props.data, props.renderFunction);
    const setStartIndex = (index) => {
        if (props.data === null || props.data === undefined)
            return;

        if (index < 0)
            index = 0;

        if (index > props.data.length - maxItemsToDisplay)
            index = props.data.length - maxItemsToDisplay;

        _setStartIndex(index);
    };

    useEffect(() => {
        var maxToDisplay = 0;
        var exitOnSet = false;
        const sizeKeys = ["xl", "lg", "md", "sm", "xs"];

        //console.log("Width", props.width);
        for (var sizeKey of sizeKeys)
        {
            if (sizeKey === props.width)
                exitOnSet = true;

            if (props.sizeToMaxItemsToDisplayMap[sizeKey] !== undefined)
            {
                maxToDisplay = props.sizeToMaxItemsToDisplayMap[sizeKey];

                if (exitOnSet)
                    break;
            }
        }

        setStartIndex(startIndex, maxToDisplay);
        _setMaxItemsToDisplay(maxToDisplay);
    }, [setStartIndex, startIndex, props]);
    
    return (
                <BodyContainer>
                    <BodyItem xs={1}>
                        <div style={{"height": "100%", "display": "inline-grid", "justifyContent": "center", "alignContent": "center"}}>
                            <IconButton style={{"transform": "scale(-2)"}} onClick={() => setStartIndex(startIndex - 1)}>
                                <DoubleArrowIcon />
                            </IconButton>
                        </div>
                    </BodyItem>
                    <BodyItem xs={10}>
                        <BodyContainer>
                            {                 
                                props.data?.map((data, index) => {
                                    if (index >= startIndex && index < startIndex + maxItemsToDisplay)
                                    {
                                        //console.log("MAX", maxItemsToDisplay); 
                                        return props.renderFunction(data, index);
                                    }

                                    return undefined;
                                })
                            }
                        </BodyContainer>
                    </BodyItem>                    
                    <BodyItem xs={1}>
                        <div style={{"height": "100%", "display": "inline-grid", "justifyContent": "center", "alignContent": "center", "float": "right"}}>
                            <IconButton style={{"transform": "scale(2)"}} onClick={() => setStartIndex(startIndex + 1)}>
                                <DoubleArrowIcon />
                            </IconButton>
                        </div>
                    </BodyItem>             
                </BodyContainer>
            );
});

export default withWidth()(HorizontalCarousell);