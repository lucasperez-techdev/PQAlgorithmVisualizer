import React, { useEffect, useState } from 'react';
import './MenuScreen.css';

function MenuScreen(props) {
    const [visibilityRatio, setVisibilityRatio] = useState(0);
    const [scrollDisabled, setScrollDisabled] = useState(false);

    // Function to calculate the visibility of the MenuScreen and adjust the opacity accordingly
    function handleScroll() {

        if (scrollDisabled) return; // Skip scroll detection when disabled

        const menuScreen = document.querySelector('.menu-screen').getBoundingClientRect();
        const screenHeight = window.innerHeight;

        // Calculate the amount of the MenuScreen visible in the viewport
        const visibleHeight = Math.min(menuScreen.bottom, screenHeight) - Math.max(menuScreen.top, 0);
        const totalHeight = menuScreen.height;

        // Ensure the visibility ratio is between 0 and 1
        const ratio = Math.max(0, Math.min(visibleHeight / totalHeight, 1));


        // Update the visibility ratio (this will control the opacity)
        setVisibilityRatio(ratio);
    }

    useEffect(function () {
        // Add scroll event listener to detect how much of the MenuScreen is visible
        if (!scrollDisabled) {
            window.addEventListener('scroll', handleScroll, { passive: true });
        }

        // Handle the fade-in when the header is clicked
        if (props.slideDown) {
            // Disable scroll detection temporarily
            setScrollDisabled(true);
            setVisibilityRatio(1); // Set full visibility when the button is clicked

            // Scroll to MenuScreen smoothly
            window.scrollTo({
                top: window.innerHeight, // Scroll down by the viewport height
                behavior: 'smooth',
            });

            // Re-enable scroll detection after the scroll is complete
            setTimeout(() => {
                setScrollDisabled(false);
            }, 1000); // Adjust this to match the smooth scroll duration
        }

        // Cleanup scroll event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll, scrollDisabled, props.slideDown]);

    return (
        <div className={'menu-screen ' + (props.slideDown ? 'show' : '')}>
            <div className={'sorting-container ' + (props.slideDown ? 'show' : '')}>
                <button class='sorting-button ' role="button">
                    <span class='sorting-text'>Sorting Algorithms</span>
                </button>
            </div>
            <div className={'searching-container' + (props.slideDown ? 'show' : '')}>
                <button className='searching-button ' role="button">
                    <span className='searching-text'>Searching Algorithms</span>
                </button>
            </div>
            <div className={'other-container' + (props.slideDown ? 'show' : '')}>
                <button className='other-button ' role="button">
                    <span className='other-text'>Other Algorithms</span>
                </button>
            </div>
        </div>

    );
}

export default MenuScreen;