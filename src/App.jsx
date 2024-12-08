import React, { useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import WordForm from "./components/wordForm/WordForm";
import WordTable from "./components/wodsTable/WordTable";
import Card from "./components/cardList/Card";

import './App.css';
import './components/theme/themeAll.css';

const App = () => {
  const [words, setWords] = useState ([
    { word: 'Father', transcription: 'ˈfäT͟Hər', translation: 'Отец', topic: 'Family'},
    { word: 'Mother', transcription: 'ˈməT͟Hər', translation: 'Мать', topic: 'Family'},
    { word: 'Brother', transcription: 'ˈbrəT͟Hər', translation: 'Брат', topic: 'Family'},
    { word: 'Sister', transcription: 'ˈsistər', translation: 'Сестра', topic: 'Family'},
]);

  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    word: '',
    transcription: '',
    translation: '',
    topic: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isEditing) {
      const updateWords = words.map((item, index) => index === editingIndex ? formData : item);
      setWords(updateWords);
      setIsEditing(false);
    } else {
      setWords([...words, formData]);
    }
    setFormData({ word: '', transcription: '', translation: '', topic: ''});
  };

  const handleEditWord = (index) => {
    setEditingIndex(index);
    setFormData(words[index]);
    setIsEditing(true);
  };

  const handleDeleteWord = (index) => {
    const updateWords = words.filter((_, i) => i !== index);
    setWords(updateWords);
    if (editingIndex === index) {
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingIndex(null);
    setFormData({ word: '', transcription: '', translation: '', topic: ''});
  };

  const headerFooterStyle = {
    color: 'var(--text-Header-Footer-color)',
    backgroundColor: 'var(--bg-Header-Footer-color)',
    fontFamily: 'var(--font-Header-Footer-family)',
  };

  return (
    <div className="app">
      <Header style={headerFooterStyle} />
      <main>
        <WordForm
          addWord={handleSubmit}
          onChange={handleChange}
          formData={formData}
          isEditing={isEditing}
        />
        <WordTable
          words={words}
          onDelete={handleDeleteWord}
          onEdit={handleEditWord}
        />
        <div className="card-list">
          {words.map((wordItem, index) => (
            <Card key={index} wordItem={wordItem} />
          ))};
        </div>
      </main>
      <Footer style={headerFooterStyle} />
    </div>
  );
};

export default App;