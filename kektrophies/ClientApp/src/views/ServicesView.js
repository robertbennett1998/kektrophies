import React from 'react';
import BodyContainer from '../components/BodyContainer';
import BodyItem from '../components/BodyItem';

function ServicesView() {  
    return (
              <div id="services_view">
                <h1>
                  Services
                </h1>
                  
                <BodyContainer>
                  <BodyItem paper fill xs={12} sm={12} md={6}>
                      <div>
                        <h2>Engraving</h2>
                        <p>
                          All engraving is completed in house on our computerised machines. Each of our services are finished to the highest standard and we endeavour to meet all of our customer's needs. We use aluminium plates on all of our trophies. We specialise in engraving annual trophies. 
                        </p>
                      </div>
                    </BodyItem>
                  <BodyItem paper fill xs={12} sm={6} md={6}>
                      <div>
                        <h2>Trophies</h2>
                        <p>At K & E.K Sports we supply quality trophies for all sports and awards. During peak season we stock over 4000+ units.</p>
                      </div>
                    </BodyItem>
                    
                    <BodyItem paper fill xs={12} sm={6} md={4}>
                      <div>
                        <h2>Sports</h2>
                        <p>We supply trophies for almost any sport or award you can think of. Our extensive range includes football, rugby, boxing, netball, gymnastics, dance and many more. K & E.K Sports Trophies will continue to amaze you with the selection that is on offer.</p>
                      </div>
                    </BodyItem>                      
                    
                    <BodyItem paper fill xs={12} sm={6} md={4}>
                      <div>
                        <h2>Corporate Awards</h2>
                        <p>With 100s of glass awards to choose from, whether it's budget glass or premium crystal awards at K & E.K. you won't be disappointed. Our turnaround on glass awards is 7 to 10 working days. However, we can supply awards with plated engraving, to a stunning effect, at a low cost.</p>
                      </div>
                    </BodyItem>
                    <BodyItem paper fill xs={12} sm={6} md={4}>
                      <div>
                        <h2>Medals</h2>
                        <p>If you’re looking for low cost medals or something extra special K & E.K are the company for you! We stock thousands of medals and ribbons; which can all be personalised with your logo/design and a coloured ribbon to suit your team or company.</p>
                      </div>
                    </BodyItem>
                </BodyContainer>
              </div>
            );
}

export default ServicesView;
