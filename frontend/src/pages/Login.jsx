import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserContextObj } from '../Context/UserContext';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, loginUser, loginAdmin, loginAuthor, setErrors, loginStatus, setLoginStatus } = useContext(UserContextObj);
  const [errorMessage, setErrorMessage] = useState('');

  async function submitRegisteredUser(userObj) {
    try {
      let res;

      // Centralized API call based on userType
      switch (userObj.userType) {
        case 'user':
          res = await loginUser(userObj);
          break;
        case 'admin':
          res = await loginAdmin(userObj);
          break;
        case 'author':
          res = await loginAuthor(userObj);
          break;
        default:
          throw new Error('Invalid user type');
      }

      if (res.status === 200) {
        // Set user data and token to localStorage
        setCurrentUser(res.data.user);
        localStorage.setItem('token', res.data.token); // Save token directly as a string
        setLoginStatus(true);
        localStorage.setItem('currentUser', JSON.stringify(res.data.user));
        
        // Navigate to the appropriate user profile
        navigate(`/${userObj.userType}profile/${res.data.user.username}`);
      } else {
        setErrorMessage(res.data.message || 'Login failed.');
        setLoginStatus(false);
      }
    } catch (err) {
      console.error("Login error:", err); // Log the error for debugging
      setErrors && setErrors(err.message);
      setErrorMessage('An error occurred during login.'); // Generic error message
      setLoginStatus(false);
    }
  }

  return (
    <div className="container">
      {loginStatus && currentUser && (
        <div className="alert alert-success mx-auto w-50 mt-3" role="alert">
          Registered as <strong className='display-4'>{currentUser.userType}</strong>
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mx-auto w-50 mt-3" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="d-flex justify-center">
        <div className='card bg-amber-500 mt-8'>
          <form className="form mt-5 p-12 pb-1 pt-1" onSubmit={handleSubmit(submitRegisteredUser)}>
            <h2 className="text-center display-3 mb-3 text-[var(--text-primary)]">Login</h2>
            <div className="user-radio d-flex justify-evenly align-items-center">
              <p className="text-[var(--text-secondary)] fw-semibold fs-5 hover:cursor-pointer">Login as: </p>
              {['user', 'admin', 'author'].map(type => (
                <div className="user-radio d-flex gap-2 text-[var(--text-primary)] hover:cursor-pointer" key={type}>
                  <input type="radio" {...register('userType', { required: true })} id={type} value={type} />
                  <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
                </div>
              ))}
            </div>
            {errors.userType && <p className='text-green-800 text-center'>*Select any one</p>}

            <label htmlFor="username" className="form-label mt-3 text-[var(--text-primary)]">Username</label>
            <input type="text" {...register('username', { required: true })} id="username" className='form-control w-96' />
            {errors.username && <p className='text-red-600'>*Username needed</p>}

            <label htmlFor="password" className="form-label mt-3 text-[var(--text-primary)]">Password</label>
            <input type="password" {...register('password', { required: true, minLength: 4 })} id="password" className='form-control w-96' />
            {errors.password && <p className="text-red-700">*Password required</p>}
            {errors.password?.type === 'minLength' && <p className="text-blue-600">*Minimum length of password is 4</p>}

            <div className="d-flex justify-center">
              <button type="submit" className='btn text-blue-800 bg-slate-200 border-indigo-700 hover:border-black hover:bg-gray-800 hover:text-white mt-4'>
                Login
              </button>
            </div>
          </form>

          <div className="d-flex justify-center gap-1 align-center mb-3 mt-0 text-[var(--text-primary)]">
            <p>Not registered yet?</p>
            <Link to='/signup' className='nav-link text-blue-600 text-[var(--text-secondary)]'>Sign up here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

