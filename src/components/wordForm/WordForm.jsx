import React, { useState } from 'react';
import BtnSave from '../buttons/BtnSave';
import './WordForm.css'
import '../buttons/Buttons.css';

const WordForm = ({ addWord, onChange, formData, isEditing }) => {
    return (
        <form onSubmit={addWord}>
            <div>
                <label htmlFor="word">Английское слово:</label>
                    <input type="text" name="word" value={formData.word} onChange={onChange} placeholder="Введите слово" required />
            </div>
            <div>
                <label htmlFor="transcription">Транскрипция:</label>
                    <input type="text" name="transcription" value={formData.transcription} onChange={onChange} placeholder="Введите транскрипцию" required />
            </div>
            <div>
                <label htmlFor="translation">Перевод:</label>
                    <input type="text" name="translation" value={formData.translation} onChange={onChange} placeholder="Введите перевод" required />
            </div>
            <div>
                <label htmlFor="topic">Тема:</label>
                    <input type="text" name="topic" value={formData.topic} onChange={onChange} placeholder="Введите тему" required />
            </div>
            <div className='btnlist'>
                <BtnSave onClick={addWord} />
            </div>
        </form>
    );
};

export default WordForm;