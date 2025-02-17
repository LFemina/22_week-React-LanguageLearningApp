import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useWords } from "./components/wordsContext/WordsContext";
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
  const {
    words,
    setWords,
    error,
    fetchWordById,
    handleChange,
    handleSubmit,
    handleDeleteWord,
    handleCancelEdit,
    formData,
    setFormData,
    isEditing,
    setIsEditing,
    editingIndex,
    errorMessage,
    setErrorMessage,
  } = useWords();

  const onEdit = useCallback(async (index) => {
    const word = words[index];
    if (word) {
      const fetchedWord = await fetchWordById(word.id);
      setFormData(fetchedWord);
      setIsEditing(true);
    }
  }, [words, fetchWordById, setFormData, setIsEditing]);

  const onDelete = useCallback((index) => {
    handleDeleteWord(index);
  }, [handleDeleteWord]);

  const onSubmit = useCallback((e) => {
    handleSubmit(e);
  }, [handleSubmit]);

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
                      addWord={onSubmit}
                      onChange={handleChange}
                      formData={formData}
                      isEditing={isEditing}
                      onClose={() => handleCancelEdit()}
                      errorMessage={errorMessage}
                    />
                    <WordTable
                      words={words}
                      onDelete={onDelete}
                      onEdit={onEdit}
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