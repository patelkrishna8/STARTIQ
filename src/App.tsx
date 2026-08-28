import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { SelectGamePage } from './pages/SelectGamePage';
import { InputMethodPage } from './pages/InputMethodPage';
import { VerificationPage } from './pages/VerificationPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { MatchHistoryPage } from './pages/MatchHistoryPage';
import { MatchDashboardPage } from './pages/MatchDashboardPage';
import { KeyMomentPage } from './pages/KeyMomentPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/analyze" element={<SelectGamePage />} />
          <Route path="/analyze/input" element={<InputMethodPage />} />
          <Route path="/analyze/verify" element={<VerificationPage />} />
          <Route path="/analyze/processing" element={<ProcessingPage />} />
          <Route path="/matches" element={<MatchHistoryPage />} />
          <Route path="/matches/:id" element={<MatchDashboardPage />} />
          <Route path="/matches/:id/moments/:momentId" element={<KeyMomentPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
