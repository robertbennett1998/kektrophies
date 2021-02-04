import React from 'react';
import NavBar from './components/NavBar';
import { Container, Grid } from '@material-ui/core';
import MediaBar from './components/MediaBar';
import FacebookIcon from '@material-ui/icons/Facebook';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import BodyItem from './components/BodyItem';
import Header from './components/Header';
import BodyContainer from './components/BodyContainer';
import WelcomeView from './views/WelcomeView';
import ServicesView from './views/ServicesView';
import TestimonialsView from './views/TestimonialsView';
import CatalogueView from './views/CatalogueView';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

function App() {
  return (
            <Container style={{ maxWidth: "1800px", height: "100%" }}>
              <Header>
                  <Grid container item justify="center" alignItems="center" xs={12} sm={12} md={3} style={{textAlign: "center"}}>
                    <img alt="" style={{ float: "left", width: "auto", maxWidth: "150px", height: "auto", minHeight: "75px"}} src="./kek_shield_icon.png" />
                    <h1>K&EK Sports Trophies</h1>
                  </Grid>
                  <NavBar links={{
                                    Home: { action: () => {
                                                            console.log("Home button pressed.");
                                                          }},
                                    Services: { action: () => {
                                                                var elmnt = document.getElementById("services_view");
                                                                elmnt.scrollIntoView();
                                                                // console.log("Services button pressed.");
                                                              }},
                                    Catalogue: { action: () => {
                                                                  var elmnt = document.getElementById("catalogue_view");
                                                                  elmnt.scrollIntoView();
                                                                  // console.log("Catalogue button pressed.");
                                                                }},
                                    Testimonials: { action: () => {
                                                                    var elmnt = document.getElementById("testimonials_view");
                                                                    elmnt.scrollIntoView();
                                                                    // console.log("Testimonials button pressed.");
                                                                  }}//,
                                    // ContactUs: { action: () => {
                                    //                               console.log("Contact Us button pressed.");
                                    //                             }}
                                }} />
                  <MediaBar icons={{
                                      facebook: {  
                                        icon: () => <FacebookIcon  />,
                                        action: () => window.open("https://www.facebook.com/kektrophies/")
                                      },
                                      mobile: {  
                                        icon: () => <PhoneIphoneIcon />,
                                        action: () => {
                                                        var tel = document.createElement("a");
                                                        tel.href = "tel:07970 980811";
                                                        tel.click();
                                        }
                                      },
                                      landline: {
                                          icon: () => <PhoneIcon />,
                                          action: () => {
                                              var tel = document.createElement("a");
                                              tel.href = "tel:01482 212138";
                                              tel.click();
                                          }
                                      },
                                      email: {  
                                        icon: () => <EmailIcon />,
                                        action: () => {
                                          var mail = document.createElement("a");
                                          mail.href = "mailto:richard@kektrophies.karoo.co.uk";
                                          mail.click();
                                        }
                                      }
                                    }} />
              </Header>
              <BodyContainer>
                <BodyItem xs={12}>
                  <WelcomeView/>
                </BodyItem>
                <BodyItem xs={12}>
                  <ServicesView />
                </BodyItem>
                <BodyItem xs={12}>
                  <TestimonialsView />
                </BodyItem>
                <BodyItem xs={12}>
                  <CatalogueView />
                </BodyItem>
              </BodyContainer>
              {/* <Footer>
                <h1>FOOTER</h1>
                <div style={{float: "right"}}>
                  <MediaBar icons={{
                                      facebook: {  
                                        icon: () => <FacebookIcon />,
                                        action: () => window.open("https://www.facebook.com/ByJazzyboo")
                                      },
                                      phone: {  
                                        icon: () => <PhoneIcon />,
                                        action: () => {
                                                        var tel = document.createElement("a");
                                                        tel.href = "tel:07703622645";
                                                        tel.click();
                                        }
                                      },
                                      email: {  
                                        icon: () => <EmailIcon />,
                                        action: () => {
                                          var mail = document.createElement("a");
                                          mail.href = "mailto:mail@example.org";
                                          mail.click();
                                        }
                                      }
                                    }} />
                  </div>
              </Footer> */}
            </Container>
          );         
}

export default App;