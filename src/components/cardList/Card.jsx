import React from "react";
import "./Card.css";

const Card = ({ wordItem, showTranslation, onToggleTranslation  }) => {
    return (
        <div className="card">
            <h2 className="font_h2">{wordItem.word}</h2>
            <p className="font_p">Транскрипция: {wordItem.transcription}</p>
            {showTranslation ? (
                <p className={`font_p font_translate`}>Перевод: {wordItem.translation}</p>
            ) : (
                <button className="btn btn_translate font_p" onClick={onToggleTranslation}>Показать перевод</button>
            )}
            <p className="font_p">Тема: {wordItem.topic}</p>
        </div>
    );
};

export default Card;