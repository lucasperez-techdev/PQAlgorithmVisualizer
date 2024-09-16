import React, { useEffect, useState } from 'react';
import './SearchingAlgs.css';

function SearchingAlgs(props) {

    return (
        <div className={'searching-screen ' + (props.slideDown ? 'show' : '')}>
            <h1>Hello World!</h1>
        </div>

    )
}


export default SearchingAlgs;