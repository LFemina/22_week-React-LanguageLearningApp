import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const WordsContext = createContext();

export const useWords = () => {
    return useContext(WordsContext);
};

export const WordsProvider = ({ children }) => {
    const [words, setWords] = useState([]);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({ english: '', transcription: '', russian: '', tags: '' });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch('http://itgirlschool.justmakeit.ru/api/words');
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке слов.');
                }
                const data = await response.json();
                setWords(data);
            } catch (error) {
                setError(error.message);
                console.error("Ошибка:", error);
            }
        };
        fetchWords();
    }, []);

    const fetchWordById = async (id) => {
        try {
            const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}`);
            if (!response.ok) {
                throw new Error(`Ошибка при загрузке слова с ID ${id}`);
            }
            const word = await response.json();
            return word;
        } catch (error) {
            setError(error.message);
            console.error("Ошибка:", error);
        }
        
        return words.find(word => word.id === id);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Изменение поля ${name}: ${value}`);

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Данные формы перед отправкой:", formData);
        
        const hasErrors = Object.values(formData).some(value => value.trim() === '');
        if (hasErrors) {
            console.error("Ошибка: Пожалуйста, заполните все поля формы!");
            setErrorMessage("Пожалуйста, заполните все поля формы!");
            return;
        } else {
            setErrorMessage('');
        }

        if (isEditing) {
            const oldWord = words[editingIndex];
            const id = oldWord.id;

            try {
                const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Ошибка при обновлении слова');
                }
                const updatedWord = await response.json();
                const updatedWords = words.map((item, index) => index === editingIndex ? updatedWord : item);
                setWords(updatedWords);
                console.log("Изменения сохранены:", { old: oldWord, new: updatedWord });
                setIsEditing(false);
            } catch (error) {
                console.error("Ошибка:", error);
                setErrorMessage(error.message || 'Ошибка при обновлении слова');
            }
        } else {
            try {
                const response = await fetch('http://itgirlschool.justmakeit.ru/api/words/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Ошибка при добавлении слова');
                }
                const newWord = await response.json();
                setWords([...words, newWord]);
                console.log("Новое слово добавлено:", newWord);
            } catch (error) {
                console.error("Ошибка:", error);
                setErrorMessage(error.message || 'Ошибка при добавлении слова');
            }
        }  
        setFormData({ english: '', transcription: '', russian: '', tags: '' });
    };

    const handleEditWord = (index) => {
        setEditingIndex(index);
        setFormData(words[index]);
        setIsEditing(true);
    };

    const handleDeleteWord = async (index) => {
        const deletedWord = words[index];
        const id = deletedWord.id;
        console.log("Удаляемое слово:", deletedWord);
        try {
            const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Ошибка при удалении слова');
            }
            const updatedWords = words.filter((_, i) => i !== index);
            setWords(updatedWords);
            console.log("Слово удалено:", deletedWord);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingIndex(null);
        setFormData({ english: '', transcription: '', russian: '', tags: '' });
        setErrorMessage('');
    };

    const onEdit = useCallback((index) => {
        handleEditWord(index);
    }, [handleEditWord]);

    const onDelete = useCallback((index) => {
        handleDeleteWord(index);
    }, [handleDeleteWord]);

    return (
        <WordsContext.Provider value={{
            words,
            setWords,
            error,
            fetchWordById,
            handleChange,
            addWord: handleSubmit,
            handleEditWord,
            handleDeleteWord,
            isEditing,
            setIsEditing,
            editingIndex,
            formData,
            setFormData,
            errorMessage,
            handleCancelEdit,
            onEdit,
            onDelete,
        }}>
            {children}
        </WordsContext.Provider>
    );
};

export default WordsContext;