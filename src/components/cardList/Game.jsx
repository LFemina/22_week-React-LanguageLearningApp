import React from "react";
import { useWords } from "../../serviceAPI/WordFunctions";
import CardCarousel from "./CardCarousel";

const Game = () => {
    const { words, error } = useWords();

    if (error) {
        return <div>Произошла ошибка: {error}</div>;
    }

    if (!words || words.length === 0) {
        return <div>Нет доступных слов для игры.</div>;
    }

    return (
        <div className="card-list">
            <CardCarousel cards={words} />
        </div>
    );
};

export default Game;