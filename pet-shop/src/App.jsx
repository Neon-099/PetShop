import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'

import LandingPage from './pages/LandingPage';
import SignInPage from './pages/user/SigninPage';
import SignUpPage from './pages/user/SignupPage';
import HomePage from './pages/user/HomePage';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminSignupPage from './pages/admin/AdminSignupPage';
import AdminDashboard from './pages/admin/AdminDashboard';
function App() {

  return (
    <Router>
     <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/signin' element={<SignInPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/admin/login' element={<AdminLoginPage />} />
      <Route path='/admin/signup' element={<AdminSignupPage />} />
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
     </Routes>
    </Router>
  )
}

export default App
