import Buttons from '../buttons/Buttons';
import './WordForm.css'

const WordForm = () => {
    return (
        <form>
            <div>
                <label htmlFor="word">Английское слово:</label>
                    <input type="text" name="word" placeholder="Введите слово" required />
            </div>
            <div>
                <label htmlFor="transcription">Транскрипция:</label>
                    <input type="text" name="transcription" placeholder="Введите транскрипцию" required />
            </div>
            <div>
                <label htmlFor="translation">Перевод:</label>
                    <input type="text" name="translation" placeholder="Введите перевод" required />
            </div>
            <div>
                <label htmlFor="topic">Тема:</label>
                    <input type="text" name="topic" placeholder="Введите тему" required />
            </div>
            <Buttons />
        </form>
    );
};

export default WordForm;