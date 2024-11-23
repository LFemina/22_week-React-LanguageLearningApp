import Card from "./Card";

const words = [
    { word: 'Father', transcription: 'ˈfäT͟Hər', translation: 'Отец', topic: 'Family'},
    { word: 'Mother', transcription: 'ˈməT͟Hər', translation: 'Мать', topic: 'Family'},
    { word: 'Brother', transcription: 'ˈbrəT͟Hər', translation: 'Брат', topic: 'Family'},
    { word: 'Sister', transcription: 'ˈsistər', translation: 'Сестра', topic: 'Family'},
];

const CardList = () => {
    return (
        <div className="card-list">
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