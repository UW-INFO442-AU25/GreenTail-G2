import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './src/QuizContext';
import { AuthProvider } from './src/AuthContext';
import { ToastProvider } from './src/contexts/ToastContext';
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
import ComparePage from './src/ComparePage';
import FirstTimePage from './src/FirstTimePage';
import LoginPage from './src/LoginPage';
import AboutPage from './src/AboutPage';
import ProfilePage from './src/ProfilePage';
import ShopsNearYouPage from './src/ShopsNearYouPage';
import TestPage from './src/TestPage';
import PetFoodLabelsGuide from './src/PetFoodLabelsGuide';
import OrganicPetFoodGuide from './src/OrganicPetFoodGuide';
import CookieConsent from './src/components/CookieConsent';
import CookiePolicyPage from './src/CookiePolicyPage';
import PrivacyPolicyPage from './src/PrivacyPolicyPage';
import TermsOfServicePage from './src/TermsOfServicePage';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <QuizProvider>
          <Router basename={import.meta.env.BASE_URL}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/quiz/0" element={<Quiz0 />} />
              <Route path="/quiz/1" element={<Quiz1 />} />
              <Route path="/quiz/2" element={<Quiz2 />} />
              <Route path="/quiz/3" element={<Quiz3 />} />
              <Route path="/quiz/4" element={<Quiz4 />} />
              <Route path="/quiz/5" element={<Quiz5 />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/first-time" element={<FirstTimePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/shops-near-you" element={<ShopsNearYouPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/pet-food-labels-guide" element={<PetFoodLabelsGuide />} />
              <Route path="/organic-pet-food-guide" element={<OrganicPetFoodGuide />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            </Routes>
            <CookieConsent />
          </Router>
        </QuizProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
