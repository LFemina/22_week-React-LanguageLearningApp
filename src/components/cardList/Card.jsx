import React, { useEffect, useRef } from "react";
import "./Card.css";

const Card = ({ wordItem, showTranslation, onToggleTranslation  }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!showTranslation && ref.current) {
            ref.current.focus();
        }
    }, [showTranslation, wordItem]);

    return (
        <div className="card">
            <h2 className="font_h2">{wordItem.word}</h2>
            <p className="font_p">Транскрипция: {wordItem.transcription}</p>
            {showTranslation ? (
                <p className={`font_p font_translate`}>Перевод: {wordItem.translation}</p>
            ) : (
                <button
                    ref={ref}
                    className="btn btn_translate font_p"
                    onClick={onToggleTranslation}
                >
                    Показать перевод
                </button>
            )}
            <p className="font_p">Тема: {wordItem.topic}</p>
        </div>
    );
};

export default Card;