import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './src/QuizContext';
import { AuthProvider } from './src/AuthContext';
import { ToastProvider } from './src/contexts/ToastContext';
import ErrorBoundary from './src/components/ErrorBoundary';
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
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <QuizProvider>
            <Router basename={import.meta.env.BASE_URL}>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
                  <Route path="/login" element={<ErrorBoundary><LoginPage /></ErrorBoundary>} />
                  <Route path="/quiz" element={<ErrorBoundary><QuizPage /></ErrorBoundary>} />
                  <Route path="/quiz/0" element={<ErrorBoundary><Quiz0 /></ErrorBoundary>} />
                  <Route path="/quiz/1" element={<ErrorBoundary><Quiz1 /></ErrorBoundary>} />
                  <Route path="/quiz/2" element={<ErrorBoundary><Quiz2 /></ErrorBoundary>} />
                  <Route path="/quiz/3" element={<ErrorBoundary><Quiz3 /></ErrorBoundary>} />
                  <Route path="/quiz/4" element={<ErrorBoundary><Quiz4 /></ErrorBoundary>} />
                  <Route path="/quiz/5" element={<ErrorBoundary><Quiz5 /></ErrorBoundary>} />
                  <Route path="/results" element={<ErrorBoundary><ResultsPage /></ErrorBoundary>} />
                  <Route path="/search" element={<ErrorBoundary><SearchPage /></ErrorBoundary>} />
                  <Route path="/compare" element={<ErrorBoundary><ComparePage /></ErrorBoundary>} />
                  <Route path="/first-time" element={<ErrorBoundary><FirstTimePage /></ErrorBoundary>} />
                  <Route path="/about" element={<ErrorBoundary><AboutPage /></ErrorBoundary>} />
                  <Route path="/profile" element={<ErrorBoundary><ProfilePage /></ErrorBoundary>} />
                  <Route path="/shops-near-you" element={<ErrorBoundary><ShopsNearYouPage /></ErrorBoundary>} />
                  <Route path="/test" element={<ErrorBoundary><TestPage /></ErrorBoundary>} />
                  <Route path="/pet-food-labels-guide" element={<ErrorBoundary><PetFoodLabelsGuide /></ErrorBoundary>} />
                  <Route path="/organic-pet-food-guide" element={<ErrorBoundary><OrganicPetFoodGuide /></ErrorBoundary>} />
                  <Route path="/cookie-policy" element={<ErrorBoundary><CookiePolicyPage /></ErrorBoundary>} />
                  <Route path="/privacy-policy" element={<ErrorBoundary><PrivacyPolicyPage /></ErrorBoundary>} />
                  <Route path="/terms-of-service" element={<ErrorBoundary><TermsOfServicePage /></ErrorBoundary>} />
                </Routes>
                <CookieConsent />
              </ErrorBoundary>
            </Router>
          </QuizProvider>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
