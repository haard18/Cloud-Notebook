import './App.css';
import Notesstate from './Context/notes/Notes_state';
import About from './components/About';
import Alert from './components/Alert';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './components/Signup';

function App() {
  return (
    <Notesstate>
      <Router>

        <Navbar />
        <Alert message={"This is iNotebook"}/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>

      </Router>
    </Notesstate>
  );
}

export default App;
