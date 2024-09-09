import React, { useState } from 'react';
import './Home.css';
import MenuScreen from './MenuScreen';

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
            <MenuScreen slideDown={slideDown} />
        </div>
    );
}

export default Home;

