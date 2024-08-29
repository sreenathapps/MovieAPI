import './App.css';
import api from './api/axiosconfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';

function App() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () =>{
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
      console.log(response.data); // Add this line to log the movies state
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;