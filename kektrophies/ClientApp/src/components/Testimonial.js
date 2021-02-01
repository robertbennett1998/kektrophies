import React from 'react';
import BodyItem from './BodyItem';

const Testimonial = ({testimonialData, index}) => {
    return (
                <BodyItem paper fill xs={12} sm={6} md={4} lg={3} xl={2}>  
                    <h1>{testimonialData.firstName} {testimonialData.lastName}</h1>
                    <h3>{testimonialData.description}</h3>
                    <p>{testimonialData.testimonial}</p>
                </BodyItem>
            );
}

export default Testimonial;