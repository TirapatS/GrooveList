import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CommunityPage from './pages/CommunityPage';
import AccountPage from './pages/AccountPage';
import './assets/css/generic.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryPage from './pages/CategoryPage';
import PlaylistPage from './pages/PlaylistPage';
import FavouritesPage from './pages/FavouritesPage';
import CommunityTracksPage from './pages/CommunityTracksPage';
import { AnimatePresence } from 'framer-motion';
import TrackInfoPage from './pages/TrackInfoPage';


function App() {

  const location = useLocation()

  return (
    <>
      <AnimatePresence exitBeforeEnter> {/* Finish animation before unmounting, then mount next component */}
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/explore" element={<ExplorePage/>}/>
          <Route path="/category/:id" element={<CategoryPage/>}/>
          <Route path="/playlist/:id" element={<PlaylistPage/>}/>
          <Route path="/community" element={<CommunityPage/>}/>
          <Route path="/community/:name" element={<CommunityTracksPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/favourites" element={<FavouritesPage/>}/>
          <Route path="/account" element={<AccountPage/>}/>
          <Route path="/track/:id" element={<TrackInfoPage/>}/>
        </Routes>
      </AnimatePresence>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
