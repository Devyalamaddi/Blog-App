import React from 'react';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup'
import Rootlayout from '../src/components/Rootlayout'

function App() {
  const browserObj=createBrowserRouter([
    {
      path:'',
      element:<Rootlayout/> ,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'signup',
          element:<Signup/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={browserObj}/>
  )
}

export default App