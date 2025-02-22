import React from 'react';
import { observer } from 'mobx-react';
import BtnSave from '../buttons/BtnSave';
import BtnClose from '../buttons/BtnClose';
import './WordForm.css';
import '../buttons/Buttons.css';
import wordStore from '../../WordStore';

const WordForm = observer(() => {
    const { formData, handleChange, handleSubmit, errorMessage, isEditing } = wordStore;

    const handleClose = () => {
        if (wordStore.validateFields()) {
            wordStore.resetErrorMessage();
        }
        wordStore.setIsEditing(false);
    };

    return (
        <div className="container-table">
            <form onSubmit={handleSubmit.bind(wordStore)}>
                <div>
                    <label htmlFor="english">Английское слово:</label>
                    <input
                        type="text"
                        name="english"
                        value={formData.english}
                        onChange={(e) => handleChange("english", e.target.value)}
                        placeholder="Введите слово"
                        className={errorMessage ? 'input-error-form' : ''}
                    />
                </div>
                <div>
                    <label htmlFor="transcription">Транскрипция:</label>
                    <input
                        type="text"
                        name="transcription"
                        value={formData.transcription}
                        onChange={(e) => handleChange("transcription", e.target.value)}
                        placeholder="Введите транскрипцию"
                        className={errorMessage ? 'input-error-form' : ''}
                    />
                </div>
                <div>
                    <label htmlFor="russian">Перевод:</label>
                    <input
                        type="text"
                        name="russian"
                        value={formData.russian}
                        onChange={(e) => handleChange("russian", e.target.value)}
                        placeholder="Введите перевод"
                        className={errorMessage ? 'input-error-form' : ''}
                    />
                </div>
                <div>
                    <label htmlFor="tags">Тема:</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={(e) => handleChange("tags", e.target.value)}
                        placeholder="Введите тему"
                        className={errorMessage ? 'input-error-form' : ''}
                    />
                </div>
                <div className='btnlist'>
                    <BtnSave type="submit" disabled={wordStore.validateFields()} />
                    {isEditing && <BtnClose onClose={handleClose} />}
                </div>
            </form>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </div>
    );
});

export default WordForm;