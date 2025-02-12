import React, { useState } from 'react';
import BtnSave from '../buttons/BtnSave';
import BtnClose from '../buttons/BtnClose';
import './WordForm.css'
import '../buttons/Buttons.css';

const WordForm = ({ addWord, onChange, formData, setFormData, isEditing, onClose, errorMessage }) => {
    const [errors, setErrors] = useState({
        english: false,
        transcription: false,
        russian: false,
        tags: false,
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
            english: formData.english.trim() === '',
            transcription: formData.transcription.trim() === '',
            russian: formData.russian.trim() === '',
            tags: formData.tags.trim() === '',
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
                <label htmlFor="english">Английское слово:</label>
                    <input
                        type="text"
                        name="english"
                        value={formData.english}
                        onChange={handleChange}
                        placeholder="Введите слово"
                        className={(errorMessage && !formData.english.trim()) || (isEditing && errors.english) ? 'input-error-form' : ''}
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
                        className={(errorMessage && !formData.transcription.trim()) || (isEditing && errors.transcription) ? 'input-error-form' : ''}
                    />
            </div>
            <div>
                <label htmlFor="russian">Перевод:</label>
                    <input
                        type="text"
                        name="russian"
                        value={formData.russian}
                        onChange={handleChange}
                        placeholder="Введите перевод"
                        className={(errorMessage && !formData.russian.trim()) || (isEditing && errors.russian) ? 'input-error-form' : ''}
                    />
            </div>
            <div>
                <label htmlFor="tags">Тема:</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="Введите тему"
                        className={(errorMessage && !formData.tags.trim()) || (isEditing && errors.tags) ? 'input-error-form' : ''}
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