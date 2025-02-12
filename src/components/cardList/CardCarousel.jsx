import React, { useState } from "react";
import Card from "./Card";
import BtnRight from "./CarouselBtn/right.svg";
import BtnLeft from "./CarouselBtn/left.svg";
import "./CardCarousel.css";

const CardCarousel = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [translationVisible, setTranslationVisible] = useState(false);
    const [studiedCount, setStudiedCount] = useState(0);
    const [studiedCards, setStudiedCards] = useState(new Set());

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(prev + 1, cards.length - 1));
        setTranslationVisible(false);
    };

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
        setTranslationVisible(false);
    };

    const toggleTranslation = () => {
        if (!translationVisible && !studiedCards.has(currentIndex)) {
            setStudiedCards(prev => new Set(prev).add(currentIndex));
            setStudiedCount(prevCount => prevCount + 1);
        }

        setTranslationVisible(prev => !prev);
    };

    if (!cards || cards.length === 0) {
        return <div className="card-game">Нет доступных слов для игры.</div>;
    }

    return (
        <div className="card-game">
            <div className="carousel">
                <button
                    onClick={handlePrev}
                    className="carousel-button"
                    disabled={currentIndex === 0}
                >
                    <img src={BtnLeft} className="btn-pict" alt="Назад" />
                </button>
                <Card
                    wordItem={cards[currentIndex]}
                    showTranslation={translationVisible}
                    onToggleTranslation={toggleTranslation}
                />
                <button
                    onClick={handleNext}
                    className="carousel-button btn-pict btn-pict-right"
                    disabled={currentIndex === cards.length - 1}
                >
                    <img src={BtnRight} className="btn-pict" alt="Вперед" />
                </button>
            </div>
            <div className="studied-count">Изучено слов: {studiedCount}</div>
        </div>
    );
};

export default CardCarousel;