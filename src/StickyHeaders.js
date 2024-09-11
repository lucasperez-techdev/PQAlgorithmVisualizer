// StickyHeaders.js
import React, { useEffect, useState } from 'react';
import './StickyHeaders.css';

function StickyHeaders() {
    const [visibilityRatio, setVisibilityRatio] = useState(0);

    useEffect( function() {
        function handleScroll () {
            // Calculate the current scroll ratio based on the window scroll position
            //Make the header only fade in after 900 units have been scrolled
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fadeHeight = 1500; // Adjust this to control how quickly the fade effect happens
            const ratio = Math.min(scrollTop / fadeHeight, 1); // Cap ratio to a maximum of 1

            // Update the visibility ratio state
            if (scrollTop >= 900) {
                setVisibilityRatio(ratio);
            } else {
                setVisibilityRatio(0);
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup scroll event listener on component unmount
        return function cleanup () {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="sticky-headers">
            <h2 className="sticky-header left-header" style={{ opacity: visibilityRatio }}>
                P & Q
            </h2>
            <h2 className="sticky-header right-header" style={{ opacity: visibilityRatio }}>
                ALGORITHM <br /> VISUALIZER
            </h2>
        </div>
    );
}

export default StickyHeaders;

