export const initialWords = [
    { english: 'Father', transcription: 'ˈfäT͟Hər', russian: 'Отец', tags: 'Family' },
    { english: 'Mother', transcription: 'ˈməT͟Hər', russian: 'Мать', tags: 'Family' },
    { english: 'Brother', transcription: 'ˈbrəT͟Hər', russian: 'Брат', tags: 'Family' },
    { english: 'Sister', transcription: 'ˈsistər', russian: 'Сестра', tags: 'Family' },
];

export const handleChange = (formData, setFormData) => (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

export const handleSubmit = (words, setWords, formData, setFormData, isEditing, editingIndex, setIsEditing, setErrorMessage) => (e) => {
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
        const updateWords = words.map((item, index) => index === editingIndex ? formData : item);
        setWords(updateWords);
        console.log("Изменения сохранены:", { old: oldWord, new: formData });
        setIsEditing(false);
    } else {
        setWords([...words, formData]);
        console.log("Новое слово добавлено:", formData);
    }
    setFormData({ english: '', transcription: '', russian: '', tags: '' });
};

export const handleEditWord = (index, words, setEditingIndex, setFormData, setIsEditing) => {
    setEditingIndex(index);
    setFormData(words[index]);
    setIsEditing(true);
};

export const handleDeleteWord = (index, words, setWords, editingIndex, setIsEditing) => {
    const deleteWord = words[index];
    console.log("Слово удалено:", deleteWord);
    const updateWords = words.filter((_, i) => i !== index);
    setWords(updateWords);
    if (editingIndex === index) {
        setIsEditing(false);
    }
};

export const handleCancelEdit = (setIsEditing, setEditingIndex, setFormData, setErrorMessage) => {
    setIsEditing(false);
    setEditingIndex(null);
    setFormData({ english: '', transcription: '', russian: '', tags: '' });
    setErrorMessage('');
};