import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../store/userSlice';
import LogoutModal from '../Features/sign-in/LogoutModal';
import IconNavHome from '../assets/icon-nav-home.svg?react';
import IconNavMovies from '../assets/icon-nav-movies.svg?react';
import IconNavSeries from '../assets/icon-nav-tv-series.svg?react';
import IconNavBookmark from '../assets/icon-nav-bookmark.svg?react';
import Logo from '../assets/logo.svg?react';
import User from '../assets/image-avatar.png';

// Header component with logout modal
function Header() {
  const [showLogout, setShowLogout] = useState(false); // Modal visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout());
    setShowLogout(false);
    navigate('/login', { replace: true });
  };

  return (
    <header className="bg-semi-dark-blue relative mb-5 flex max-h-[600px] items-center justify-between p-4 sm:flex-col sm:rounded-2xl sm:p-6">
      <Logo className="sm:mb-15" />

      <nav>
        <ul className="flex gap-8 sm:flex-col">
          <li>
            <NavLink to="home">
              <IconNavHome className="text-greyish-blue hover:text-red-400" />
            </NavLink>
          </li>
          <li>
            <NavLink to="movies">
              <IconNavMovies className="text-greyish-blue hover:text-red-400" />
            </NavLink>
          </li>
          <li>
            <NavLink to="series">
              <IconNavSeries className="text-greyish-blue hover:text-red-400" />
            </NavLink>
          </li>
          <li>
            <NavLink to="bookmarked">
              <IconNavBookmark className="text-greyish-blue hover:text-red-400" />
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* User profile picture triggers logout modal */}
      <div className="relative mt-auto">
        <img
          className="w-8 cursor-pointer rounded-full border-2 border-transparent hover:border-[#FC4747]"
          src={User}
          alt="User profile"
          onClick={() => setShowLogout(true)}
        />
        {/* Logout modal (moved to its own component) */}
        {showLogout && (
          <LogoutModal
            onLogout={handleLogout}
            onCancel={() => setShowLogout(false)}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
