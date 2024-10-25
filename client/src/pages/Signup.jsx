import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserContextObj } from '../Context/UserContext';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  // Import context registration functions
  const { registerUser, registerAdmin, registerAuthor, error: contextError } = useContext(UserContextObj);

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
        <div className='card bg-amber-500 mt-8'>
          <form className="form mt-5 p-12 pb-1 pt-1" onSubmit={handleSubmit(submitRegisteredUser)}>
            <h2 className="text-center display-3 mb-3">Register</h2>

            {err && <p className='text-danger'>{err}</p>}
            {contextError && <p className='text-danger'>{contextError}</p>} {/* Display context errors if any */}

            <div className="user-radio d-flex justify-evenly">
              <p className="text-green-300 fw-semibold fs-5">Register as: </p>
              <div className="user-radio d-flex gap-2">
                <input type="radio" {...register('userType', { required: true })} id="user" value="user" />
                <label htmlFor="user">user</label>
              </div>
              <div className="user-radio d-flex gap-2">
                <input type="radio" {...register('userType', { required: true })} id="admin" value="admin" />
                <label htmlFor="admin">admin</label>
              </div>
              <div className="user-radio d-flex gap-2">
                <input type="radio" {...register('userType', { required: true })} id="author" value="author" />
                <label htmlFor="author">author</label>
              </div>
            </div>
            {errors.userType && <p className='text-green-800 text-center'>*Select any one</p>}

            <label htmlFor="username" className="form-label mt-3">Username</label>
            <input type="text" {...register('username', { required: true })} id="username" className='form-control w-96' />
            {errors.username && <p className='text-red-600'>*Username needed</p>}

            <label htmlFor="password" className="form-label mt-3">Password</label>
            <input type="password" {...register('password', { required: true, minLength: 8 })} id="password" className='form-control w-96' />
            {errors.password?.type === 'required' && <p className="text-red-700">*Give a password</p>}
            {errors.password?.type === 'minLength' && <p className="text-blue-600">*Minimum length of password is 8</p>}

            <label htmlFor="email" className="form-label mt-3">Email</label>
            <input type="email" {...register('email', { required: true })} id="email" className='form-control w-96' />
            {errors.email && <p className="text-red-500">*Enter email</p>}

            <div className="d-flex justify-center">
              <button type="submit" className='btn text-blue-800 bg-slate-200 border-indigo-700 hover:border-black hover:bg-gray-800 hover:text-white mt-4'>
                Register
              </button>
            </div>
          </form>

          <div className="d-flex justify-center align-center mb-3 mt-0">
            <p>Already registered?</p>
            <Link to='/login' className='nav-link text-blue-600'>Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
