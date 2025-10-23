import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './src/QuizContext';
import HomePage from './src/HomePage';
import QuizPage from './src/QuizPage';
import SearchPage from './src/SearchPage';
import Quiz0 from './src/Quiz0';
import Quiz1 from './src/Quiz1';
import Quiz2 from './src/Quiz2';
import Quiz3 from './src/Quiz3';
import Quiz4 from './src/Quiz4';
import Quiz5 from './src/Quiz5';
import ResultsPage from './src/ResultsPage';

function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/0" element={<Quiz0 />} />
          <Route path="/quiz/1" element={<Quiz1 />} />
          <Route path="/quiz/2" element={<Quiz2 />} />
          <Route path="/quiz/3" element={<Quiz3 />} />
          <Route path="/quiz/4" element={<Quiz4 />} />
          <Route path="/quiz/5" element={<Quiz5 />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
