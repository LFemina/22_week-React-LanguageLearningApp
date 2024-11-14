import "./Card.css";

const Card = ({ word, transcription, translation, topic }) => {
    return (
        <div className="card">
            <h2>{word}</h2>
            <p>Транскрипция: {transcription}</p>
            <p>Перевод: {translation}</p>
            <p>Тема: {topic}</p>
        </div>
    );
};

export default Card;