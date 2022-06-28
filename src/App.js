import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeProvider from './providers/ThemeContext';

//PAGES
import Dashboard from './pages/dashboard';
import Category from './pages/category';
import Playlist from './pages/playlist';

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/playlist/:id" element={<Playlist />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
