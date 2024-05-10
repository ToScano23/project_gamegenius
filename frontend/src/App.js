import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';
import Resposta from './components/Resposta';


function App() {
  return (
    <div className="App">
        <Header/>
        <Form/>
        <Resposta/>
        <Footer/>
    </div>
  );
}

export default App;
