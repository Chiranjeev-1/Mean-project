import logo from './logo.svg';
import './App.css';
import {BrowserRouter as  Router,Routes,Route } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home/:userEmail' element={<Home/>}/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
