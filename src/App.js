import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Nav from './components/Nav'
import { useAuthContext } from './hooks/useAuthContext'

function App() {

  const { isAuthReady, user } = useAuthContext();

  return (
    <div className="App">
      {isAuthReady ? (
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate replace={true} to="/login" />} />
            <Route path="/login" element={user ? <Navigate replace={true} to="/" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate replace={true} to="/" /> : <Signup />} />
          </Routes>
        </BrowserRouter>
      ) : "Loading..." }
      
    </div>
  );
}

export default App
