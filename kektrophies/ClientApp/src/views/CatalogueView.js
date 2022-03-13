import React, { useLayoutEffect, useRef, useState } from 'react';

function CatalogueView() {  
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
    }, [setCatalogHeight, catalogRef, aspectRatio]);

    return (
                <div id="catalogue_view">
                    <h1>Catalogue</h1>
                    <iframe ref={catalogRef} title={"Catalog_2021"} frameborder="0" src="https://online.flippingbook.com/view/556704999/" width="100%" height={catalogHeight + "px"} style={{ maxHeight: catalogMaxHeight + "px"}} />
                </div>
            );
}

export default CatalogueView;
