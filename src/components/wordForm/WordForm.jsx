import React, { useState } from 'react';
import BtnSave from '../buttons/BtnSave';
import BtnClose from '../buttons/BtnClose';
import './WordForm.css'
import '../buttons/Buttons.css';

const WordForm = ({ addWord, onChange, formData, setFormData, isEditing, onClose, errorMessage }) => {
    const [errors, setErrors] = useState({
        word: false,
        transcription: false,
        translation: false,
        topic: false,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrors(prevErrors => {
            const newErrors = {
                ...prevErrors,
                [name]: value.trim() === '',
            };
            return newErrors;
        });
        onChange(event);
    };

    const validateFields = () => {
        return Object.values({
            word: formData.word.trim() === '',
            transcription: formData.transcription.trim() === '',
            translation: formData.translation.trim() === '',
            topic: formData.topic.trim() === '',
        }).some(error => error);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addWord(event);
    };

    return (
        <div className="container-table">
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="word">Английское слово:</label>
                    <input
                        type="text"
                        name="word"
                        value={formData.word}
                        onChange={handleChange}
                        placeholder="Введите слово"
                        className={(errorMessage && !formData.word.trim()) || (isEditing && errors.word) ? 'input-error-form' : ''}
                    />
            </div>
            <div>
                <label htmlFor="transcription">Транскрипция:</label>
                    <input
                        type="text"
                        name="transcription"
                        value={formData.transcription}
                        onChange={handleChange}
                        placeholder="Введите транскрипцию"
                        className={(errorMessage && !formData.word.trim()) || (isEditing && errors.transcription) ? 'input-error-form' : ''}
                    />
            </div>
            <div>
                <label htmlFor="translation">Перевод:</label>
                    <input
                        type="text"
                        name="translation"
                        value={formData.translation}
                        onChange={handleChange}
                        placeholder="Введите перевод"
                        className={(errorMessage && !formData.word.trim()) || (isEditing && errors.translation) ? 'input-error-form' : ''}
                    />
            </div>
            <div>
                <label htmlFor="topic">Тема:</label>
                    <input
                        type="text"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        placeholder="Введите тему"
                        className={(errorMessage && !formData.word.trim()) || (isEditing && errors.topic) ? 'input-error-form' : ''}
                    />
            </div>
            <div className='btnlist'>
                <BtnSave type="submit" disabled={validateFields()} />
                {isEditing && <BtnClose onClose={onClose} />}
            </div>
        </form>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </div>
    );
};

export default WordForm;