import React from 'react';
import HorizontalCarousel from './HorizontalCarousel';
import Testimonial from '../components/Testimonial';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const TestimonialCarousel = (props) => {
    return (
        <div id="testimonials_view">
            <div style={{"overflow": "hidden"}}>
                <h1 style={{"float": "left", "padding": "10px 0px", "margin": "0 0", "textAlign": "top"}}>Testimonials</h1>
                <IconButton style={{"float": "right", "marginTop": "10px", "padding": "0px 0px"}} onClick={() => props.onStartCreatingNewTestimonial(true)}>
                    <AddCircleIcon />
                </IconButton>
            </div>
            <HorizontalCarousel sizeToMaxItemsToDisplayMap={ props.sizeToMaxItemsToDisplayMap } 
                                 data={ props.testimonials }
                                 renderFunction={
                                     (data, index) => <Testimonial testimonialData={data} index={index}/>
                                 }
            />
        </div>
    );
}

export default TestimonialCarousel;