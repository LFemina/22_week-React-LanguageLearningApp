import Header from './components/header/Header';
import CardList from "./components/cardList/CardList";
import Footer from './components/footer/Footer';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <CardList />
      </main>
      <Footer />
    </div>
  );
};

export default App;