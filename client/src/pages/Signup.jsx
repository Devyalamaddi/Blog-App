import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserContextObj } from '../Context/UserContext';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [userType, setUserType] = useState('');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();

  // Import context registration functions
  const { registerUser, registerAdmin, registerAuthor, error: contextError } = useContext(UserContextObj);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  async function submitRegisteredUser(userObj) {
    setRegistrationStatus(false);

    try {
      let message;
      if (userObj.userType === 'user') {
        message = await registerUser(userObj);
      } else if (userObj.userType === 'admin') {
        message = await registerAdmin(userObj);
      } else if (userObj.userType === 'author') {
        message = await registerAuthor(userObj);
      }

      if (message.toLowerCase().includes('created')) {
        setRegistrationStatus(true);
        setUserType(userObj.userType);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setErr(message);
      }
    } catch (error) {
      setErr('Error during registration');
    }
  }

  return (
    <div className="container">

      {registrationStatus && (
        <div className="alert alert-success mx-auto w-50 mt-3" role="alert">
          Registered as <strong className='display-4'>{userType}</strong>
        </div>
      )}
      <div className="d-flex justify-center">
        <div className='card mt-8'>
          <form className="form mt-5 p-12 pb-1 pt-1" onSubmit={handleSubmit(submitRegisteredUser)}>
            <h2 className="text-center display-3 mb-3 text-[var(--text-primary)]">Register</h2>

            {err && <p className='text-red-500'>{err}</p>}
            {contextError && <p className='text-red-500'>{contextError}</p>} {/* Display context errors if any */}

            <div className="user-radio d-flex justify-evenly text-[var(--text-primary)]">
              <p className="fw-semibold fs-5">Register as: </p>
              <div className="d-flex gap-2">
                <input type="radio" {...register('userType', { required: true })} id="user" value="user" />
                <label htmlFor="user">User</label>
              </div>
              <div className="d-flex gap-2">
                <input type="radio" {...register('userType', { required: true })} id="admin" value="admin" />
                <label htmlFor="admin">Admin</label>
              </div>
              <div className="d-flex gap-2">
                <input type="radio" {...register('userType', { required: true })} id="author" value="author" />
                <label htmlFor="author">Author</label>
              </div>
            </div>
            {errors.userType && <p className='text-red-500 text-center'>*Select any one</p>}

            <label htmlFor="username" className="form-label mt-3 text-[var(--text-primary)]">Username</label>
            <input type="text" {...register('username', { required: true })} id="username" className='form-control w-96' />
            {errors.username && <p className='text-red-600'>*Username required</p>}

            <label htmlFor="password" className="form-label mt-3 text-[var(--text-primary)]">Password</label>
            <input type="password" {...register('password', { required: true, minLength: 8 })} id="password" className='form-control w-96' />
            {errors.password?.type === 'required' && <p className="text-red-600">*Enter a password</p>}
            {errors.password?.type === 'minLength' && <p className="text-blue-500">*Minimum length is 8</p>}

            <label htmlFor="email" className="form-label mt-3 text-[var(--text-primary)]">Email</label>
            <input type="email" {...register('email', { required: true })} id="email" className='form-control w-96' />
            {errors.email && <p className="text-red-500">*Enter email</p>}

            <div className="d-flex justify-center">
              <button type="submit" className='btn btn-primary mt-4'>
                Register
              </button>
            </div>
          </form>

          <div className="d-flex justify-center gap-1 align-center mb-3 mt-0 text-[var(--text-primary)]">
            <p>Already registered?{" "}</p>
            <Link to='/login' className='nav-link text-blue-600 text-[var(--text-secondary)]'>{" "}Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

