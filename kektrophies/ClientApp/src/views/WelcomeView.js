import React from 'react';
import BodyContainer from '../components/BodyContainer';
import BodyItem from '../components/BodyItem';

function WelcomeView({}) {  
    return (
              <div id="welcome_view">
                <h1>
                    Welcome
                </h1>
                <BodyContainer>
                  <BodyItem paper fill xs={12}>
                    <p>
                      After what has been a difficult times for everyone we just wanted to let you know that we look different but we are still trading.  We no longer have our retail premises, however, you can contact us via mobile (<a href="tel:07970 980811" target="_blank" rel="noreferrer">07970 980811</a>), e-mail (<a href="mailto:richard@kektrophies.karoo.co.uk" target="_blank" rel="noreferrer">richard@kektrophies.karoo.co.uk</a>) or via <a href="https://www.facebook.com/kektrophies/" target="_blank" rel="noreferrer">Facebook Messenger</a>.  We look forward to hearing from you and best wishes for 2021 and beyond.
                    </p>

                    <p>
                      K & E.K Sports Trophies & Engravers have proudly supplied local sports teams, schools, organisations and companies since 1973. We are a family run business who pride ourselves on the quality of our goods and high levels of customer service we provide. We price our goods competitively to ensure you are receiving the best deals; which in turn leads to high levels of customer satisfaction.
                    </p>

                    <p>
                      K & E.K Sports Trophies proudly supply trophies, cups, medals and engraving services throughout Hull and East Riding.
                    </p> 

                    <p>
                      At K & E.K Sports Trophies aim to please with our vast knowledge of the trade we work in. With over 47 years of working in the trophy industry, we have a keen eye on what a quality product is. Our customers always come first and nothing is a problem. We believe our service is second to none, our focus is always the customer's needs.
                    </p>
                  </BodyItem>
                </BodyContainer>
              </div>
            );
}

export default WelcomeView;
