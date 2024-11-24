import Buttons from "../buttons/Buttons";
import "./Card.css";

const Card = ({ word, transcription, translation, topic }) => {
    return (
        <div className="card">
            <h2 className="font_h2">{word}</h2>
            <p className="font_p">Транскрипция: {transcription}</p>
            <p className="font_p">Перевод: {translation}</p>
            <p className="font_p">Тема: {topic}</p>
            <Buttons />
        </div>
    );
};

export default Card;