import React from "react";

export default function FirstPage(props) {
    return (
        <div>
            <h1 className="intro-title">Quizzical</h1>
            <p className="intro-text">Some description if needed</p>
            <button className="intro-btn" onClick={props.onClick}>Start quiz</button>
        </div>
    )
}