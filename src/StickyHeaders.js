// StickyHeaders.js
import React, { useEffect, useState } from 'react';
import './StickyHeaders.css';


function StickyHeaders() {
    const [visibilityRatio, setVisibilityRatio] = useState(0);
    const [canClick, setCanClick] = useState(false);

    function handleStickyHeaderClick() {
        // Smoothly scrolls to the top of the page
        if (canClick) {
        window.scrollTo({
            top: 0, // Scroll to the top of the page
            behavior: 'smooth', // Smooth scrolling effect
        })};
    }

    useEffect(() => {
        function handleScroll() {
            // Calculate the current scroll ratio based on the window scroll position
            const scrollTop = window.scrollY;
            const fadeHeight = 1500; // Adjust this to control how quickly the fade effect happens
            const ratio = Math.min(scrollTop / fadeHeight, 1); // Cap ratio to a maximum of 1


            // Update the visibility ratio state
            if (scrollTop >= 550) {
                setVisibilityRatio(ratio);
                setCanClick(ratio > 0)
            } else {
                setVisibilityRatio(0);
                setCanClick(false);
            }
        }

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup scroll event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="sticky-headers">
            <h2
                className="sticky-header left-header"
                style={{
                    opacity: visibilityRatio,
                    cursor: canClick ? 'pointer' : 'default',
            }}
                onClick={handleStickyHeaderClick}
            >
                P & Q
            </h2>
            <h2
                className="sticky-header right-header"
                style={{
                    opacity: visibilityRatio,
                    cursor: canClick ? 'pointer' : 'default',
            }}
                onClick={handleStickyHeaderClick}
            >
                ALGORITHM <br /> VISUALIZER
            </h2>
        </div>
    );
}

export default StickyHeaders;
