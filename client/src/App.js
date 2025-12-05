import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import Scores from './pages/Scores';
import Challenges from './pages/Challenges';
import Gamification from './pages/Gamification';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light-gray">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/gamification" element={<Gamification />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

