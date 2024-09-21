import React, { useEffect, useRef } from 'react';
import './App.css';
import Home from './Home';
import StickyHeaders from "./StickyHeaders";
import MenuScreen from "./MenuScreen";
import SortingAlgs from "./SortingAlgs";
import SearchingAlgs from "./SearchingAlgs";
import OtherAlgs from "./OtherAlgs";

function App() {
    // Create refs for both sections
    const sortingAlgsRef = useRef(null);
    const searchingAlgsRef = useRef(null);
    const otherAlgsRef = useRef(null);


    // Function to scroll to SortingAlgs section
    const scrollToSortingAlgs = () => {
        if (sortingAlgsRef.current) {
            sortingAlgsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Function to scroll to SearchingAlgs section
    const scrollToSearchingAlgs = () => {
        if (searchingAlgsRef.current) {
            searchingAlgsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToOtherAlgs = () => {
        if (otherAlgsRef.current) {
            otherAlgsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

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

    const dividers = Array.from({ length: 10 }, (_, index) => (
        <div key={index} className="divider" style={{ top: `${index * 100}vh` }}></div>
    ));

    return (
        <div className="app-container">
            <StickyHeaders />
            <Home />
            {/* Pass both scroll functions to MenuScreen */}
            <MenuScreen
                scrollToSortingAlgs={scrollToSortingAlgs}
                scrollToSearchingAlgs={scrollToSearchingAlgs}
                scrollToOtherAlgs={scrollToOtherAlgs}
            />
            <div ref={sortingAlgsRef}>
                <SortingAlgs />
            </div>
            <div ref={searchingAlgsRef}>
                <SearchingAlgs />
            </div>
            <div ref={otherAlgsRef}>
                <OtherAlgs />
            </div>
            {dividers}
            {/* Add more screens here as needed */}
        </div>
    );
}

export default App;
