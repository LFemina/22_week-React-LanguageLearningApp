import React, { useState } from "react";
import Card from "./Card";
import BtnRight from "./CarouselBtn/right.svg";
import BtnLeft from "./CarouselBtn/left.svg";
import "./CardCarousel.css";

const CardCarousel = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [translationVisible, setTranslationVisible] = useState(false);

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setTranslationVisible(false);
        } else {
            alert("Ура! Изучение пройдено!");
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setTranslationVisible(false);
        }
    };

    const toggleTranslation = () => {
        setTranslationVisible(prev => !prev);
    };

    return (
        <div className="carousel">
            <button onClick={handlePrev} className="carousel-button">
                <img src={BtnLeft} className="btn-pict" alt="Назад" />
            </button>
            <Card
                wordItem={cards[currentIndex]}
                showTranslation={translationVisible}
                onToggleTranslation={toggleTranslation}
            />
            <button onClick={handleNext} className="carousel-button btn-pict btn-pict-right">
            <img src={BtnRight} className="btn-pict" alt="Вперед" />
            </button>
        </div>
    );
};

export default CardCarousel;