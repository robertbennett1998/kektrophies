import React, { useEffect, useState } from 'react';
import HorizontalCarousell from '../components/HorizontalCarousel';
import Testimonial from '../components/Testimonial';
import KekApi from '../KekApi';
import { Button, TextField, IconButton } from '@material-ui/core';
import BodyContainer from '../components/BodyContainer';
import BodyItem from '../components/BodyItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import TestimonialCarousel from "../components/TestimonialCarousel";
import NewTestimonialForm from "../components/NewTestimonialForm";

class TestimonialsView extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            testimonials: [],
            isCreatingNewTestimonial: false,
            requestError: null
        };
    }

    loadTestimonials() {
        KekApi.GetTestimonials().then((response) => {
            this.setState({
                testimonials: response.data.testimonials
            });
        }).catch((error) => this.setState({ requestError: error }));
    }

    onStartCreatingNewTestimonial() {
        this.setState({ isCreatingNewTestimonial: true });
    }
    
    onNewTestimonialSubmitted(code, testimonial) {
        this.setState({ isCreatingNewTestimonial: false });

        KekApi.CreateTestimonial(code, testimonial).then((response) => {
            this.loadTestimonials();
        }).catch((error) => this.setState({ requestError: error }));
    }
    
    onNewTestimonialCanceled() {
        this.setState({ isCreatingNewTestimonial: false });
    }
        
    componentDidMount() {
        this.loadTestimonials();
    }

    render() {
        console.log(this.state.testimonials);
        if (!this.state.isCreatingNewTestimonial) {
            if (this.state.requestError === null) {
                console.log("START TC RENDER")

                return (
                    <TestimonialCarousel testimonials={this.state.testimonials} 
                                         sizeToMaxItemsToDisplayMap={
                                             {"xs": 1, "sm": 2, "md": 3, "lg": 4, "xl": 6}
                                         }
                                         onStartCreatingNewTestimonial={this.onStartCreatingNewTestimonial.bind(this)}
                    />
                );
            } else {
                return (
                    <div id="testimonials_view">
                        <h1>Testimonials</h1>
                        <h2>{this.state.requestError.message}</h2>
                    </div>
                );
            }
        } else {
            return <NewTestimonialForm onSubmit={this.onNewTestimonialSubmitted.bind(this)} 
                                       onCancel={this.onNewTestimonialCanceled.bind(this)} />
        }
    }
}

export default TestimonialsView;
