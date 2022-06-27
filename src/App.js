import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ThemeProvider from './providers/ThemeContext';

//PAGES
import Dashboard from './pages/dashboard';
import Categories from './pages/categories';
import Playlists from './pages/playlists';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/categories" element={<Categories />} />
          <Route path="/playlists" element={<Playlists />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
