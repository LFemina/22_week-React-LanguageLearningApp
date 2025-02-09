import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import WordForm from "./components/wordForm/WordForm";
import WordTable from "./components/wodsTable/WordTable";
import CardCarousel from "./components/cardList/CardCarousel";
import NavBar from "./Router/NavBar";
import Missing from "./Router/Missing";
import './App.css';
import './components/theme/themeAll.css';

const App = () => {
  const [words, setWords] = useState ([
    { english: 'Father', transcription: 'ˈfäT͟Hər', russian: 'Отец', tags: 'Family'},
    { english: 'Mother', transcription: 'ˈməT͟Hər', russian: 'Мать', tags: 'Family'},
    { english: 'Brother', transcription: 'ˈbrəT͟Hər', russian: 'Брат', tags: 'Family'},
    { english: 'Sister', transcription: 'ˈsistər', russian: 'Сестра', tags: 'Family'},
]);

  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    english: '',
    transcription: '',
    russian: '',
    tags: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = Object.values(formData).some(value => value.trim() === '');
    if (hasErrors) {
      setErrorMessage("Пожалуйста, заполните все поля формы!");
      return;
    } else {
      setErrorMessage('');
    }

    if(isEditing) {
      const oldWord = words[editingIndex];
      const updateWords = words.map((item, index) => index === editingIndex ? formData : item);
      setWords(updateWords);
      console.log("Изменения сохранены:", {
        old: oldWord,
        new: formData,
      });
      setIsEditing(false);
    } else {
      setWords([...words, formData]);
      console.log("Новое слово добавлено:", formData);
    }
    setFormData({ english: '', transcription: '', russian: '', tags: ''});
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
    setFormData({ english: '', transcription: '', russian: '', tags: ''});
    setErrorMessage('');
  };

  const headerFooterStyle = {
    color: 'var(--text-Header-Footer-color)',
    backgroundColor: 'var(--bg-Header-Footer-color)',
    fontFamily: 'var(--font-Header-Footer-family)',
  };

  return (
    <Router>
      <div className="app">
        <div className="parent-container">
          <div className="fixed-container">
            <Header style={headerFooterStyle} />
            <NavBar />
          </div>
          <main className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <WordForm
                      addWord={handleSubmit}
                      onChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                      isEditing={isEditing}
                      onClose={handleCancelEdit}
                      errorMessage={errorMessage}
                    />
                    <WordTable
                      words={words}
                      onDelete={handleDeleteWord}
                      onEdit={handleEditWord}
                    />
                  </div>
                }
              />
              <Route
                path="/game"
                element={
                  <div className="card-list">
                    <CardCarousel cards={words} />
                  </div>
                }
              />
              <Route path="*" element={<Missing />} />
            </Routes>
          </main>
        </div>
        <Footer style={headerFooterStyle} />
      </div>
    </Router>
  );
};

export default App;