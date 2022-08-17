import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Explore/>} />
          <Route path='/offers' element={<Offers/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </>
  );
}

export default App;
