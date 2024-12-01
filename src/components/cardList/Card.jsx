import React, { useState } from "react";
import Buttons from "../buttons/Buttons";
import "./Card.css";
import "../buttons/Buttons.css";

const Card = ({ word, transcription, translation, topic }) => {

    const [showTranslation, setShowTranslation] = useState(false);

    return (
        <div className="card">
            <h2 className="font_h2">{word}</h2>
            <p className="font_p">Транскрипция: {transcription}</p>
            {showTranslation ? (
                <p className={`font_p font_translate`}>Перевод: {translation}</p>
            ) : (
                <button className="btn btn_translate font_p" onClick={() => setShowTranslation(true)}>Показать перевод</button>
            )}
            <p className="font_p">Тема: {topic}</p>
            <Buttons />
        </div>
    );
};

export default Card;