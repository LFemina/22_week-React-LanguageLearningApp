import { useEffect, useState } from 'react';

export const useWords = () => {
    const [words, setWords] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch('http://itgirlschool.justmakeit.ru/api/words');
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке слов');
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
    };

    return { words, setWords, error, fetchWordById };
};

export const handleChange = (formData, setFormData) => (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

export const handleSubmit = (words, setWords, formData, setFormData, isEditing, editingIndex, setIsEditing, setErrorMessage) => async (e) => {
    e.preventDefault();

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

export const handleEditWord = (index, words, setEditingIndex, setFormData, setIsEditing) => {
    setEditingIndex(index);
    setFormData(words[index]);
    setIsEditing(true);
};

export const handleDeleteWord = (index, words, setWords, editingIndex, setIsEditing) => {
    const deletedWord = words[index];
    const id = deletedWord.id;
    console.log("Удаляемое слово:", deletedWord);

    const deleteWord = async () => {
        try {
            const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении слова');
            }

            const updatedWords = words.filter((_, i) => i !== index);
            setWords(updatedWords);

            if (editingIndex === index) {
                setIsEditing(false);
            }
            console.log("Слово удалено:", deletedWord);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    deleteWord();
};

export const handleCancelEdit = (setIsEditing, setEditingIndex, setFormData, setErrorMessage) => {
    setIsEditing(false);
    setEditingIndex(null);
    setFormData({ english: '', transcription: '', russian: '', tags: '' });
    setErrorMessage('');
};