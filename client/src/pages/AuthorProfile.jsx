import React, { useContext, useEffect } from 'react';
import { UserContextObj } from '../Context/UserContext';
import { Link, Outlet } from 'react-router-dom';

function AuthorProfile() {
    const { currentUser, setCurrentUser } = useContext(UserContextObj);
    const savedUser = localStorage.getItem('currentUser');

    useEffect(() => {
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
    }, [savedUser, setCurrentUser]);

    // Ensure currentUser is not null before rendering
    if (!currentUser) {
        return <div className="container"><h1>Please log in to view this profile.</h1></div>;
    }

    return (
        <div className="container">
            <h1 className="display-3">{currentUser.username}</h1>
            <h3 className="display-5">{currentUser.email}</h3>
            <Link to='article' className='text-green-800'>New article</Link>
            <Outlet />
        </div>
    );
}

export default AuthorProfile;
