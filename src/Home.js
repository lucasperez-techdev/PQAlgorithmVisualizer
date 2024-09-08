import React, { useState } from 'react';
import './Home.css';

function Home() {
    const [slideDown, setSlideDown] = useState(false);

    function handleHeaderClick() {
        setSlideDown(true);
    }

    let className = 'home-container';
    if (slideDown) {
        className += ' slide-down';
    }

    return (
        <div className="home-wrapper">
            <div className={className}>
                <button className="home-header" onClick={handleHeaderClick}>
                    <h1>P & Q <br /> ALGORITHM <br /> VISUALIZER</h1>
                </button>
            </div>
            <div className={`second-screen ${slideDown ? 'show' : ''}`}>
                <h2>P & Q</h2>
                <h2>ALGORITHM <br/> VISUALIZER</h2>
            </div>
        </div>
    );
}

export default Home;

