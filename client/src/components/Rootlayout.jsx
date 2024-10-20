import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Rootlayout() {
  return (
    <>
        <Header/>
            <div style={{minHeight:'100vh'}}>
                <Outlet/>
            </div>
        <Footer/>
    </>
  )
}

export default Rootlayout