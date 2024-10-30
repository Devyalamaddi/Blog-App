import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Rootlayout from '../src/components/Rootlayout';
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/AdminProfile';
import AuthorProfile from './pages/AuthorProfile';
import NewArticle from './components/NewArticle';
import Articles from './components/Articles';
import ArticleById from './pages/ArticleById';

function App() {
  const browserObj = createBrowserRouter([
    {
      path: '',
      element: <Rootlayout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
        {
          path: 'userprofile/:username',
          element: <UserProfile />,
          children: [
            {
              path: 'view-articles',
              element: <Articles />,
            },
          ],
        },
        {
          path: 'adminprofile/:username',
          element: <AdminProfile />,
        },
        {
          path: 'authorprofile/:username',
          element: <AuthorProfile />,
          children: [
            {
              path: 'article',
              element: <NewArticle />,
            },
          ],
        },
        {
          path: 'articleById/:articleId',
          element: <ArticleById key={`${'articleId'}`} />, // corrected here
        },
      ],
    },
  ]);

  return <RouterProvider router={browserObj} />;
}

export default App;
