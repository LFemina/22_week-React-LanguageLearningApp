import Header from "./components/Header";
import CardList from "./components/CardList";
import Footer from "./components/Footer";
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