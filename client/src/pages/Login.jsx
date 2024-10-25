import React from 'react'
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom'


function Login() {
  const {register,handleSubmit,formState:{errors}} =useForm();;

  function submitRegisteredUser(userObj){
    console.log(userObj)
  }
  return (
    <div className="container">
      <div className="d-flex justify-center">
        <div className='card bg-amber-500 mt-8'>
          <form className="form mt-5 p-12 pb-1 pt-1" onSubmit={handleSubmit(submitRegisteredUser)}>
            <h2 className="text-center display-3 mb-3">Login</h2>
            <div className="user-radio d-flex justify-evenly ">
              
              <div className="user-radio d-flex gap-2 ">
                <input type="radio" {...register('userType',{required:true})} id="user" value="user"/>
                <label htmlFor="user">user</label>
              </div>
              <div className="user-radio d-flex gap-2 ">
                <input type="radio" {...register('userType',{required:true})} id="admin" value="admin"/>
                <label htmlFor="admin">admin</label>
              </div>
              <div className="user-radio d-flex gap-2 ">
                <input type="radio" {...register('userType',{required:true})} id="author" value="author"/>
                <label htmlFor="author">author</label>
              </div>
              
            </div>
            {
              errors.userType?.type==='required' && <p className='text-green-800 text-center'>*select any one</p>
            }

            
            <label htmlFor="username" className="form-label mt-3">username</label>
            <input type="text" {...register('username',{required:true})} id="username" className='form-control w-96'/>
            {
              errors.username?.type==='required' && <p className='text-red-600'>*username needed</p>
            }

            <label htmlFor="password" className="form-label mt-3">password</label>
            <input type="password" {...register('password',{required:true,minLength:8})} id="password" className='form-control w-96' />
            {
              errors.password?.type==='required' && <p className="text-red-700">*give a password</p>
            }
            {
              errors.password?.type==='minLength' && <p className="text-blue-600">*minimum length of password is 8</p>
            }

            <div className="d-flex justify-center">
              <button type="submit" className='btn text-blue-800 bg-slate-200 border-indigo-700 hover:border-black hover:bg-gray-800 hover:text-white mt-4 '>Login</button>
            </div>
          </form>

          <div className="d-flex justify-center align-center mb-3 mt-0">
            <p>Already registered?</p> <Link to='/signup' className='nav-link text-blue-600'>Login here</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login