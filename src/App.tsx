import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MovieListPage from './routes/MovieListPage';
import MovieDetailsPage from './routes/MovieDetailsPage';
import './styles/App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className='app'>
      <SearchBar />
        <Routes>
          <Route path="/" element={<MovieListPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
