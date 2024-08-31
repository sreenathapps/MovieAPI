import './App.css';
import api from './api/axiosconfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer.js';
import Reviews from './components/reviews/Reviews.js';

function App() {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) =>  {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);

      const singleMovie = response.data;

      setMovies(singleMovie);

      setReviews(singleMovie.reviews)
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);


  return (
    
    <div className='App'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />}></Route>
          <Route path='/Trailer/:ytTrailerId' element={<Trailer/>}></Route>
          <Route path='/Reviews/:movieId' element = {<Reviews getMoviesData = {getMovieData} reviews={reviews} setReviews = {setReviews}></Reviews>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App; 