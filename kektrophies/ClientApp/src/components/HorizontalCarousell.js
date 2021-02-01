import React from 'react';
import { IconButton } from '@material-ui/core';
import BodyContainer from './BodyContainer';
import BodyItem from './BodyItem';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import withWidth from '@material-ui/core/withWidth';

export class HorizontalCarousell extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            startIndex: 0,
            maxItemsToDisplay: 0
        }
    }
    
    setStartIndex(index) {
        if (this.props.data === null || this.props.data === undefined)
            return;

        if (index < 0)
            index = 0;

        if (index > this.props.data.length - this.state.maxItemsToDisplay)
            index = this.props.data.length - this.state.maxItemsToDisplay;

        this.setState({ 
            startIndex: index
        });
    }

    setMaxItemsToDisplay(maxItems) {
        this.setStartIndex(this.state.startIndex);
        this.setState({
            maxItemsToDisplay: maxItems
        });
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data || prevProps.width !== this.props.width) {
            let maxToDisplay = 0;
            let exitOnSet = false;
            const sizeKeys = ["xl", "lg", "md", "sm", "xs"];

            // console.log("Width", this.props.width);
            for (const sizeKey of sizeKeys) {
                if (sizeKey === this.props.width)
                    exitOnSet = true;

                if (this.props.sizeToMaxItemsToDisplayMap[sizeKey] !== undefined) {
                    maxToDisplay = this.props.sizeToMaxItemsToDisplayMap[sizeKey];

                    if (exitOnSet)
                        break;
                }
            }

            this.setMaxItemsToDisplay(maxToDisplay);
        }
    }
    
    render() {
        return (
            <div>
                <div style={{
                    "height": "100%",
                    "display": "inline-grid",
                    "justifyContent": "center",
                    "alignContent": "center",
                    "float": "left"
                }}>
                    <IconButton disabled={this.state.startIndex === 0} style={{"transform": "scale(-2)"}} onClick={() => this.setStartIndex(this.state.startIndex - 1)}>
                        <DoubleArrowIcon/>
                    </IconButton>
                </div>
                <BodyContainer>
                    <BodyItem xs={12}>
                        <BodyContainer>
                            {
                                this.props.data?.map((data, index) => {
                                    if (index >= this.state.startIndex && index < this.state.startIndex + this.state.maxItemsToDisplay) {
                                        //console.log("MAX", maxItemsToDisplay); 
                                        return this.props.renderFunction(data, index);
                                    }
        
                                    return undefined;
                                })
                            }
                        </BodyContainer>
                    </BodyItem>
                </BodyContainer>
                <div style={{
                    "height": "100%",
                    "display": "inline-grid",
                    "justifyContent": "center",
                    "alignContent": "center",
                    "float": "right"
                }}>
                    <IconButton disabled={this.state.startIndex + this.state.maxItemsToDisplay >= this.props.data.length} style={{"transform": "scale(2)"}} onClick={() => this.setStartIndex(this.state.startIndex + 1)}>
                        <DoubleArrowIcon/>
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default withWidth()(HorizontalCarousell);