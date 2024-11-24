import Header from './components/header/Header';
import WordForm from './components/wordForm/WordForm';
import CardList from "./components/cardList/CardList";
import Footer from './components/footer/Footer';
import './App.css';
import './components/theme/themeAll.css';

const App = () => {
  const headerFooterStyle = {
    color: 'var(--text-Header-Footer-color)',
    backgroundColor: 'var(--bg-Header-Footer-color)',
    fontFamily: 'var(--font-Header-Footer-family)',
  };

  const cardStyle = {
    border: 'var(--card-border)',
    backgroundColor: 'var(--card-bg-color)',
  };

  return (
    <div className="app">
      <Header style={headerFooterStyle} />
      <main>
        <div>
          <WordForm />
        </div>
        <CardList style={cardStyle} />
      </main>
      <Footer style={headerFooterStyle} />
    </div>
  );
};

export default App;