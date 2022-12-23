import { Routes, Route } from 'react-router';
import LandingPage from './pages/landingPage';
import HomePage from './pages/homePage';

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
