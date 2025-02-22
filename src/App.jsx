import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { observer } from "mobx-react";
import WordStore from './WordStore';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import WordForm from "./components/wordForm/WordForm";
import WordTable from "./components/wodsTable/WordTable";
import CardCarousel from "./components/cardList/CardCarousel";
import NavBar from "./Router/NavBar";
import Missing from "./Router/Missing";
import './App.css';
import './components/theme/themeAll.css';

const App = observer(() => {
    useEffect(() => {
        WordStore.fetchWords();
    }, []);

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
                                            addWord={WordStore.onSubmit.bind(WordStore)}
                                            onChange={(e) => WordStore.handleChange(e.target.name, e.target.value)}
                                            formData={WordStore.formData}
                                            setFormData={WordStore.setFormData}
                                            isEditing={WordStore.isEditing}
                                            onClose={() => WordStore.handleCancelEdit()}
                                            errorMessage={WordStore.errorMessage}
                                        />
                                        <WordTable
                                            words={WordStore.words}
                                            onDelete={(index) => WordStore.onDelete(index)}
                                            onEdit={(index) => WordStore.onEdit(index)}
                                        />
                                    </div>
                                }
                            />
                            <Route
                                path="/game"
                                element={
                                    <div className="card-list">
                                        <CardCarousel cards={WordStore.words} />
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
});

export default App;