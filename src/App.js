import React from 'react'
import { BrowserRouter as Router, Route, Routes }
  from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Create from './Components/Form';

function App() {
  return (
    <div className='App'>

      <Router>
        <Routes>
          <Route path='/'
            element={<Home />} />
          <Route path='/create'
            element={<Create />} />
          <Route path="/edit/:id" element={<Create />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
