import './App.css';
import Welcome from './components/welcome.js';
import Homepage from './components/homepage.js';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
     <div className='app'>
        <Router> 
        <Routes>
          <Route path="/" element={<Welcome/>}/>
            <Route path="/homepage" element={<Homepage/>}>
          </Route>
        </Routes>
    </Router>
     </div>
     
 
  );
}

export default App;
