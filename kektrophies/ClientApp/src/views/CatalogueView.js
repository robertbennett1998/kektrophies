import React, { useLayoutEffect, useRef, useState } from 'react';
import { Button, ButtonGroup, Grid, useMediaQuery } from '@material-ui/core';

function CatalogueView({}) {  
    const aspectRatio = 2/3;
    const [catalogHeight, setCatalogHeight] = useState(0);
    const [catalogMaxHeight, setCatalogMaxHeight] = useState(0);
    const catalogRef = useRef(null);

    useLayoutEffect(() => {
        const resizeHandler = () => {
            if (catalogRef.current !== null)
            {
                setCatalogHeight(catalogRef.current.clientWidth * aspectRatio);
                setCatalogMaxHeight(window.innerWidth * aspectRatio);
            }
        };

        resizeHandler();
        window.addEventListener("resize", resizeHandler);

        return () => window.removeEventListener("resize", resizeHandler);
    }, [setCatalogHeight, catalogRef]);

    return (
                <div id="catalogue_view">
                    <h1>Catalogue</h1>
                    <iframe ref={catalogRef} frameborder="0" src="https://online.flippingbook.com/view/72664/" width="100%" height={catalogHeight + "px"} style={{ maxHeight: catalogMaxHeight + "px"}} />
                </div>
            );
}

export default CatalogueView;
