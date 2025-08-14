// Login page component
// Uses Redux to authenticate user with hardcoded credentials (see userSlice.js)
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

// Login page component
// Uses Redux to authenticate user with hardcoded credentials (see userSlice.js)
function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const error = useSelector((state) => state.user.error);

  // Local state for form fields
  const [email, setEmail] = useState('x@mail.com');
  const [password, setPassword] = useState('x123');

  // If already authenticated, redirect to /home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear error on unmount or when fields change
  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#10141E] p-6">
      <div className="flex w-full max-w-md flex-col items-center rounded-xl bg-[#161D2F] p-8 shadow-lg">
        {/* Logo Placeholder */}
        <div className="mb-8">
          <img src="/logo.svg" alt="App Logo" className="h-8" />
        </div>
        <h2 className="mb-6 text-2xl font-semibold text-white">Login</h2>
        <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-md border border-red-200 bg-[#161D2F] px-4 py-3 text-white transition outline-none placeholder:text-[#5A698F] focus:border-[#FC4747]"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border border-red-200 bg-[#161D2F] px-4 py-3 text-white transition outline-none placeholder:text-[#5A698F] focus:border-[#FC4747]"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {/* Show error if login fails */}
          {error && (
            <div className="bg-opacity-20 rounded bg-[#FC4747] px-4 py-2 text-sm text-[#fff]">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-md bg-[#FC4747] py-3 font-semibold text-white transition hover:bg-[#ff6a6a]"
          >
            Login to your account
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-[#ffffffc1]">Don&apos;t have an account?</span>
          <a href="#" className="ml-2 text-[#FC4747] hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
