import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserContextObj } from '../Context/UserContext';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, loginUser, loginAdmin, loginAuthor, setErrors, loginStatus, setLoginStatus } = useContext(UserContextObj);
  // const [LoginStatus, setLoginStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function submitRegisteredUser(userObj) {
    console.log(userObj);
    try {
      let res;
      if (userObj.userType === 'user') {
        res = await loginUser(userObj);
      } else if (userObj.userType === 'admin') {
        res = await loginAdmin(userObj);
      } else if (userObj.userType === 'author') {
        res = await loginAuthor(userObj);
      }
  
      if (res.status === 200) {
        setCurrentUser(res.data.user);
        setLoginStatus(true);
        localStorage.setItem('currentUser', JSON.stringify(res.data.user));
        navigate(`/${userObj.userType}profile/${res.data.user.username}`);
      } else {
        setErrorMessage(res.data.message || 'Login failed.');
        setLoginStatus(false);
      }
    } catch (err) {
      // Ensure setErrors is used here for error handling
      setErrors(err); // Correctly call setErrors to handle the error
      setErrorMessage('An error occurred during login.'); // Optionally set an error message
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
            <h2 className="text-center display-3 mb-3">Login</h2>
            <div className="user-radio d-flex justify-evenly align-items-center">
              <p className="text-green-300 fw-semibold fs-5">login as: </p>
              <div className="user-radio d-flex gap-2">
                <input type="radio" {...register('userType', { required: true })} id="user" value="user" />
                <label htmlFor="user">User</label>
              </div>
              <div className="user-radio d-flex gap-2">
                <input type="radio" {...register('userType', { required: true })} id="admin" value="admin" />
                <label htmlFor="admin">Admin</label>
              </div>
              <div className="user-radio d-flex gap-2">
                <input type="radio" {...register('userType', { required: true })} id="author" value="author" />
                <label htmlFor="author">Author</label>
              </div>
            </div>
            {errors.userType && <p className='text-green-800 text-center'>*Select any one</p>}

            <label htmlFor="username" className="form-label mt-3">Username</label>
            <input type="text" {...register('username', { required: true })} id="username" className='form-control w-96' />
            {errors.username && <p className='text-red-600'>*Username needed</p>}

            <label htmlFor="password" className="form-label mt-3">Password</label>
            <input type="password" {...register('password', { required: true, minLength: 4 })} id="password" className='form-control w-96' />
            {errors.password && <p className="text-red-700">*Password required</p>}
            {errors.password?.type === 'minLength' && <p className="text-blue-600">*Minimum length of password is 4</p>}

            <div className="d-flex justify-center">
              <button type="submit" className='btn text-blue-800 bg-slate-200 border-indigo-700 hover:border-black hover:bg-gray-800 hover:text-white mt-4'>
                Login
              </button>
            </div>
          </form>

          <div className="d-flex justify-center align-center mb-3 mt-0">
            <p>Not registered yet?{' '}</p> 
            <Link to='/signup' className='nav-link text-blue-600'>Sign up here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
