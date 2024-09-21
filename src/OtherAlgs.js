import React, { useEffect, useState } from 'react';
import './OtherAlgs.css';

function OtherAlgs(props) {

    return (
        <div className={'other-screen ' + (props.slideDown ? 'show' : '')}>
            <h1>Hello World And Pee!</h1>
        </div>

    )
}


export default OtherAlgs;