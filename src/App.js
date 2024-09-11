import React, { useEffect } from 'react';
import './App.css';
import Home from './Home';
import StickyHeaders from "./StickyHeaders";

function App() {
    useEffect(() => {
        const handleScroll = () => {
            // Get the scroll position of the document
            const scrollPosition = window.scrollY;
            const appContainer = document.querySelector('.app-container');

            // Dynamically adjust the gradient background position based on scroll
            appContainer.style.backgroundPosition = `0% ${scrollPosition / 2}%`;
        };

        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const dividers = Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="divider" style={{ top: `${index * 100}vh` }}></div>
    ));


    return (
        <div className="app-container">
            <StickyHeaders />
            <Home />
            {dividers}
            {/* Add more screens here as needed */}
        </div>
    );
}

export default App;



