import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import WordForm from "./components/wordForm/WordForm";
import WordTable from "./components/wodsTable/WordTable";
import Card from "./components/cardList/Card";
import CardCarousel from "./components/cardList/CardCarousel";
import NavBar from "./Router/NavBar";
import Missing from "./Router/Missing";
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
                      isEditing={isEditing}
                      onClose={handleCancelEdit}
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