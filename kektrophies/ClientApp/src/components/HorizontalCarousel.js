import React from 'react';
import { IconButton } from '@material-ui/core';
import BodyContainer from './BodyContainer';
import BodyItem from './BodyItem';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import withWidth from '@material-ui/core/withWidth';

export class HorizontalCarousel extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            startIndex: 0
            // maxItemsToDisplay: 0
        }
    }
    
    setStartIndex(index) {
        if (this.props.data === null || this.props.data === undefined)
            return;

        const maxToDisplay = this.calculateMaxItemsToDisplay();
        
        if (index < 0)
            index = 0;

        if (index > this.props.data.length - maxToDisplay)
            index = this.props.data.length - maxToDisplay;

        this.setState({ 
            startIndex: index
        });
    }

    calculateMaxItemsToDisplay() {
        let maxToDisplay = 0;
        let exitOnSet = false;
        const sizeKeys = ["xl", "lg", "md", "sm", "xs"];
        
        for (const sizeKey of sizeKeys) {
            if (sizeKey === this.props.width)
                exitOnSet = true;

            if (this.props.sizeToMaxItemsToDisplayMap[sizeKey] !== undefined) {
                maxToDisplay = this.props.sizeToMaxItemsToDisplayMap[sizeKey];

                if (exitOnSet)
                    break;
            }
        }
        
        return maxToDisplay;
    }
    
    // setMaxItemsToDisplay(maxItems) {
    //     this.setStartIndex(this.state.startIndex);
    //     this.setState({
    //         maxItemsToDisplay: maxItems
    //     });
    // }
    
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data || prevProps.width !== this.props.width) {
            this.setStartIndex(this.state.startIndex);
        }
    }
    
    render() {
        return (
            <BodyContainer>
                <BodyItem xs={1}>
                    <div style={{
                        "height": "100%",
                        "display": "inline-grid",
                        "justifyContent": "center",
                        "alignContent": "center"
                    }}>
                        <IconButton hidden={this.state.startIndex === 0} style={{"transform": "scale(-2)"}} onClick={() => this.setStartIndex(this.state.startIndex - 1)}>
                            <DoubleArrowIcon/>
                        </IconButton>
                    </div>
                </BodyItem>
                <BodyItem xs={10}>
                    <BodyContainer>
                        {
                            this.props.data?.map((data, index) => {
                                if (index >= this.state.startIndex && index < this.state.startIndex + this.calculateMaxItemsToDisplay()) {
                                    return this.props.renderFunction(data, index);
                                }

                                return undefined;
                            })
                        }
                    </BodyContainer>
                </BodyItem>
                <BodyItem xs={1}>
                    <div style={{
                        "height": "100%",
                        "display": "inline-grid",
                        "justifyContent": "center",
                        "alignContent": "center",
                        "float": "right"
                    }}>
                        <IconButton hidden={this.state.startIndex + this.calculateMaxItemsToDisplay() >= this.props.length} style={{"transform": "scale(2)"}} onClick={() => this.setStartIndex(this.state.startIndex + 1)}>
                            <DoubleArrowIcon/>
                        </IconButton>
                    </div>
                </BodyItem>
            </BodyContainer>
        );
    }
}

export default withWidth()(HorizontalCarousel);