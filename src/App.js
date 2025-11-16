import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ConsultantDetail from './pages/ConsultantDetail';
import AdminPanel from './pages/AdminPanel';
import ConsultantPanel from './pages/ConsultantPanel';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/falcilar" element={<HomePage />} />
            <Route path="/falci/:id" element={<ConsultantDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/falci-panel" element={<ConsultantPanel />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/hakkimizda" element={<AboutPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
