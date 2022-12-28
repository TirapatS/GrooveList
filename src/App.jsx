import { Routes, Route } from 'react-router';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RecentlyPlayedPage from './pages/RecentlyPlayedPage';
import './assets/css/generic.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/explore" element={<ExplorePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="signup" element={<SignupPage/>}/>
      <Route path="recently-played" element={<RecentlyPlayedPage/>}/>

      {/*TODO Favourites and Create Album page is only available for logged in users */}
    </Routes>
  )
}

export default App
