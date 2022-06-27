import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ThemeProvider from './providers/ThemeContext';

//PAGES
import Dashboard from './pages/dashboard';
import Category from './pages/category';


function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          {/* categories/images */}
          <Route path="/categories/images" element={<Category/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
