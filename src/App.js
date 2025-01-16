
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Favourite from './components/Favourite';
import BookDetails from './components/BookDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
     
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/books/:id' element={<BookDetails/>} />
          <Route path='/favourite' element={<Favourite/>} />
          
        </Routes>
      <Footer/>
   
      </>
  );
}

export default App;
