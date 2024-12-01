import React, { useState } from "react";
import Card from "./Card";

const CardList = ({ style }) => {
    const [words, setWords] = useState([
        { word: 'Father', transcription: 'ˈfäT͟Hər', translation: 'Отец', topic: 'Family'},
        { word: 'Mother', transcription: 'ˈməT͟Hər', translation: 'Мать', topic: 'Family'},
        { word: 'Brother', transcription: 'ˈbrəT͟Hər', translation: 'Брат', topic: 'Family'},
        { word: 'Sister', transcription: 'ˈsistər', translation: 'Сестра', topic: 'Family'},
    ]);

    const [newWord, setNewWord] = useState('');
    const [newTranscription, stNewTranscription] = useState('');
    const [newTranslation, setNewTranslation] = useState('');
    const [newTopic, setNewTopic] = useState('');

    const handleAddWord = () => {
        const newEntry = {word: newWord, transcription: newTranscription, translation: newTranslation, topic: newTopic }
    };

    return (
        <div className="card-list" style={style}>
            {words.map((wordItem, index) => (
                <Card
                    key={index}
                    word={wordItem.word}
                    transcription={wordItem.transcription}
                    translation={wordItem.translation}
                    topic={wordItem.topic}
                />
            ))}
        </div>
    );
};

export default CardList;