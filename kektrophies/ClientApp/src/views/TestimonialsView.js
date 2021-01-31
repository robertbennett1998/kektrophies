import React, { useEffect, useState } from 'react';
import HorizontalCarousell from '../components/HorizontalCarousell';
import Testimonial from '../components/Testimonial';
import KekApi from '../KekApi';
import { Button, TextField, IconButton, ButtonGroup } from '@material-ui/core';
import BodyContainer from '../components/BodyContainer';
import BodyItem from '../components/BodyItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';

function TestimonialsView({}) {  
    const sizeToMaxItemsToDisplayMap = { "xs": 1, "sm": 2, "md": 3, "lg": 4, "xl": 6 };

    const [testimonials, setTestimonials] = useState([]);
    const [isCreatingNewTestimonial, setIsCreatingNewTestimonial] = useState(false);
    const [code, setCode] = useState("");
    const [testimonial, setTestimonial] = useState("");
    const [requestError, setRequestError] = useState(null);

    const submitNewTestimonial = () => {
      console.log("Testimonial Submited:");
      console.log("Code:", code);
      console.log("Testimonial:", testimonial);

      KekApi.CreateTestimonial(code, testimonial).then((response) => {
        //TODO: Add api call
        setCode("");
        setTestimonial("");
        setIsCreatingNewTestimonial(false);

        KekApi.GetTestimonials().then((response) => {
          // console.log(response);
          setTestimonials(response.data.testimonials);
        }).catch((error) => setRequestError(error));
      });
    };

    useEffect(() => {
      KekApi.GetTestimonials().then((response) => {
                                                  // console.log(response);
                                                  setTestimonials(response.data.testimonials);
                                                }).catch((error) => setRequestError(error));
      return () => { }
    }, [setTestimonials, setRequestError])

    if (!isCreatingNewTestimonial)
    {
      if (requestError === null)
      {
        return (
                  <div id="testimonials_view">
                    <div style={{"overflow": "hidden"}}>
                      <h1 style={{"float": "left", "padding": "10px 0px", "margin": "0 0", "textAlign": "top"}}>Testimonials</h1>
                      <IconButton style={{"float": "right", "marginTop": "10px", "padding": "0px 0px"}} onClick={() => setIsCreatingNewTestimonial(true)}>
                        <AddCircleIcon />
                      </IconButton>
                    </div>
                    <HorizontalCarousell sizeToMaxItemsToDisplayMap={sizeToMaxItemsToDisplayMap} data={testimonials} renderFunction={(data, index) => <Testimonial testimonialData={data} index={index} />} />
                  </div>
                );  
      }
      else
      {
        return (
          <div id="testimonials_view">
            <h1>Testimonials</h1>
            <h2>{requestError.message}</h2>
          </div>
        );
      }
    }
    else
    {
        return (
          
                <div id="testimonials_view">
                   <div style={{"overflow": "hidden"}}>
                      <h1 style={{"float": "left", "padding": "10px 0px", "margin": "0 0", "textAlign": "top"}}>New Testimonial</h1>
                      <IconButton style={{"float": "right", "marginTop": "10px", "padding": "0px 0px"}} onClick={() => setIsCreatingNewTestimonial(false)}>
                        <CancelIcon />
                      </IconButton>
                    </div>
                  <BodyContainer>
                    <BodyItem paper fill xs={12}>
                      <p>Thank you for taking the time to leave a testimonial.</p>
                      <form noValidate autoComplete="off">
                        <TextField id="testimonial-code" required id="standard-basic" label="Code" value={code} onChange={(e) => setCode(e.target.value)} />
                        <TextField required fullWidth multiline id="testimonial-testimonial" rows={6} rowsMax={12} label="Testimonial" value={testimonial} onChange={(e) => setTestimonial(e.target.value)} />
                        <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center", "marginTop": "10px"}} >
                          <Button variant="outlined" style={{"marginRight": "5px"}} onClick={submitNewTestimonial}>Submit</Button>
                          <Button variant="outlined" color="secondary" onClick={() => setIsCreatingNewTestimonial(false)}>Cancel</Button>
                        </div>
                      </form>
                    </BodyItem>
                  </BodyContainer>
                </div>
                );
    }
}

export default TestimonialsView;
