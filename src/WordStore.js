import { makeAutoObservable } from 'mobx';

class WordStore {
    words = [];
    error = null;
    errorMessage = '';
    formData = {
        english: '',
        transcription: '',
        russian: '',
        tags: '',
    };
    isEditing = false;
    editingIndex = null;

    constructor() {
        makeAutoObservable(this);
    }

    setWords(words) {
        this.words = words;
    }

    setError(error) {
        this.error = error;
    }

    setErrorMessage(errorMessage) {
        this.errorMessage = errorMessage;
    }

    resetErrorMessage() {
        this.setErrorMessage('');
    }

    setFormData(formData) {
        this.formData = formData;
    }

    setIsEditing(isEditing) {
        this.isEditing = isEditing;
    }

    setEditingIndex(editingIndex) {
        this.editingIndex = editingIndex;
    }

    handleChange = (name, value) => {
        this.setFormData({ ...this.formData, [name]: value });
    }

    handleChangeForm(name, value) {
        this.formData[name] = value;
    }

    validateFields() {
        return Object.values(this.formData).some(value => value.trim() === '');
    }

    async fetchWords() {
        try {
            const response = await fetch('http://itgirlschool.justmakeit.ru/api/words');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке слов');
            }
            const data = await response.json();
            this.setWords(data);
        } catch (error) {
            this.setError(error.message);
            console.error("Ошибка:", error);
        }
    }

    async fetchWordById(id) {
        try {
            const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}`);
            if (!response.ok) {
                throw new Error(`Ошибка при загрузке слова с ID ${id}`);
            }
            return await response.json();
        } catch (error) {
            this.setError(error.message);
            console.error("Ошибка:", error);
        }
    }

    async addWord() {
        try {
            const response = await fetch('http://itgirlschool.justmakeit.ru/api/words/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.formData),
            });
            if (!response.ok) {
                throw new Error('Ошибка при добавлении слова');
            }
            const newWord = await response.json();
            this.setWords([...this.words, newWord]);
            console.log("Новое слово добавлено:", newWord);
            this.setFormData({ english: '', transcription: '', russian: '', tags: '' });
        } catch (error) {
            console.error("Ошибка:", error);
            this.setErrorMessage(error.message || 'Ошибка при добавлении слова');
        }
    }

    async updateWord(id) {
        try {
            const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.formData),
            });
            if (!response.ok) {
                throw new Error('Ошибка при обновлении слова');
            }
            const updatedWord = await response.json();
            this.setWords(this.words.map(word => (word.id === id ? updatedWord : word)));
            console.log("Изменения сохранены:", updatedWord);
            this.setFormData({ english: '', transcription: '', russian: '', tags: '' });
        } catch (error) {
            console.error("Ошибка:", error);
            this.setErrorMessage(error.message || 'Ошибка при обновлении слова');
        }
    }

    handleDeleteWord(index) {
        const deletedWord = this.words[index];
        if (!deletedWord) {
            console.error("Слово не найдено для удаления.");
            return;
        }

        const id = deletedWord.id;
        console.log("Удаляемое слово:", JSON.parse(JSON.stringify(deletedWord)));

        const deleteWord = async () => {
            try {
                const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
                    method: 'POST',
                });
                if(!response.ok) {
                    throw new Error('Ошибка при удалении слова');
                }
                const updatedWords = this.words.filter((_, i) => i !== index);
                this.setWords(updatedWords);

                if (this.editingIndex === index) {
                    this.setIsEditing(false);
                }
                console.log("Слово удалено:", JSON.parse(JSON.stringify(deletedWord)));
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        deleteWord();
        
    }

    handleCancelEdit() {
        this.setIsEditing(false);
        this.setEditingIndex(null);
        this.setFormData({ english: '', transcription: '', russian: '', tags: '' });
        this.setErrorMessage('');
    }

    onEdit(index) {
        const word = this.words[index];
        if (word) {
            this.fetchWordById(word.id).then(fetchedWord => {
                this.setFormData(fetchedWord);
                this.setEditingIndex(index);
                this.setIsEditing(true);
            });
        }
    }

    onDelete = (index) => {
        const word = this.words[index];
        if (typeof word !== 'undefined') {
            this.handleDeleteWord(index);
        } else {
            console.error("Удаляемое слово не найдено!");
        }
    }

    async onSubmit(e) {
        e.preventDefault();
        if (this.isEditing && this.editingIndex !== null) {
            const word = this.words[this.editingIndex];
            await this.updateWord(word.id);
        } else {
            await this.addWord();
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validateFields()) {
            this.setErrorMessage('Все поля должны быть заполнены!');
            return;
        }
        this.setErrorMessage('');

        if (this.isEditing && this.editingIndex !== null) {
            this.updateWord(this.editingIndex);
        } else {
            this.addWord();
        }
    }
}

const wordStore = new WordStore();
export default wordStore;