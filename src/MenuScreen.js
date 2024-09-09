import React, { useEffect, useState } from 'react';
import './MenuScreen.css';

function MenuScreen(props) {
    // Initialize the fadeIn state to false
    const [fadeIn, setFadeIn] = useState(false);

    // Use the useEffect hook to run code when the slideDown prop changes
    useEffect(function() {
        // Check if the slideDown prop is true
        if (props.slideDown) {
            // Set a timer to change the fadeIn state to true after 1 second
            var timer = setTimeout(function() {
                setFadeIn(true);
            }, 350); // Adjust the delay to match the transition duration of the slide-down effect

            // Cleanup function to clear the timer when the component unmounts
            return function() {
                clearTimeout(timer);
            };
        }
    }, [props.slideDown]);

    // Return the JSX for the component
    return (
        <div className={'menu-screen ' + (props.slideDown ? 'show' : '')}>
            <h2 className={fadeIn ? 'fade-in' : ''}>P & Q</h2>
            <h2 className={fadeIn ? 'fade-in' : ''}>ALGORITHM <br /> VISUALIZER</h2>
        </div>
    );
}

export default MenuScreen;


