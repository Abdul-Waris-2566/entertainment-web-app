import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './UI/AppLayout';
import Error from './UI/Error';
import Homepage from './Features/Home/Homepage';
import Movies from './Features/Movies/Movies';
import Series from './Features/Series/Series';
import Bookmarked from './Features/bookmarked/Bookmarked';
import UserLogin from './Features/sign-in/UserLogin';
import ProtectedRoute from './UI/ProtectedRoute';

// import {
//   homepageLoader,
//   moviesLoader,
//   seriesLoader,
//   bookmarkedMoviesLoader,
// } from './services/dataLoaders';

// Router configuration:
// - /login: public login page
// - All other routes: protected by ProtectedRoute, only accessible if authenticated
const router = createBrowserRouter([
  {
    path: '/login',
    element: <UserLogin />,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoute />, // Protect all routes below
    children: [
      {
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
          { path: '/', element: <Homepage />, errorElement: <Error /> },
          { path: 'home', element: <Homepage />, errorElement: <Error /> },
          { path: 'movies', element: <Movies />, errorElement: <Error /> },
          { path: 'series', element: <Series />, errorElement: <Error /> },
          {
            path: 'bookmarked',
            element: <Bookmarked />,
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
