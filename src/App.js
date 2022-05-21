import './App.css';
import UploadForm from './components/Forms';
import ListFiles from './components/ListFiles';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
        <div className="App">
      <header className="App-header">
        <div className='container my-3'>
        <Navbar />
        <br/>
        <Routes>
          <Route exact path="/" element={<UploadForm />} />
          <Route exact path="/ListFiles" element={<ListFiles />} />
        </Routes>
        </div>
      </header>
    </div>
    </Router>
    
    
  );
}

export default App;
