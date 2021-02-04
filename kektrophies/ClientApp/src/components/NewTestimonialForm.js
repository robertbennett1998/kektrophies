import React, { useEffect, useState } from 'react';
import HorizontalCarousell from './HorizontalCarousel';
import Testimonial from '../components/Testimonial';
import { Button, TextField, IconButton } from '@material-ui/core';
import BodyContainer from '../components/BodyContainer';
import BodyItem from '../components/BodyItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import KekApi from "../KekApi";

const NewTestimonialForm = (props) => {
    const [code, setCode] = useState("");
    const [testimonial, setTestimonial] = useState("");

    return (
        <div id="testimonials_view">
            <div style={{"overflow": "hidden"}}>
                <h1 style={{"float": "left", "padding": "10px 0px", "margin": "0 0", "textAlign": "top"}}>
                    New Testimonial
                </h1>
                <IconButton style={{"float": "right", "marginTop": "10px", "padding": "0px 0px"}}
                            onClick={() => props.onCancel()}>
                    <CancelIcon/>
                </IconButton>
            </div>
            <BodyContainer>
                <BodyItem paper fill xs={12}>
                    <p>Thank you for taking the time to leave a testimonial.</p>
                    <form noValidate autoComplete="off">
                        <TextField id="testimonial-code" required label="Code" value={code}
                                   onChange={(e) => setCode(e.target.value)}/>
                        <TextField required fullWidth multiline id="testimonial-testimonial" rows={6}
                                   rowsMax={12} label="Testimonial" value={testimonial}
                                   onChange={(e) => setTestimonial(e.target.value)}/>
                        <div style={{
                            "display": "flex",
                            "justifyContent": "center",
                            "alignItems": "center",
                            "marginTop": "10px"
                        }}>
                            <Button variant="outlined" style={{"marginRight": "5px"}}
                                    onClick={() => props.onSubmit(code, testimonial)}>Submit</Button>
                            <Button variant="outlined" color="secondary"
                                    onClick={() => props.onCancel()}>Cancel</Button>
                        </div>
                    </form>
                </BodyItem>
            </BodyContainer>
        </div>
    );
}

export default NewTestimonialForm