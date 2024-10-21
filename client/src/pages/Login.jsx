import React from 'react'

function Login() {
  return (
    <div className="container">
      <div className="d-flex justify-center">
        <div className='card bg-amber-500 mt-8'>
          <form className="form mt-5 p-12 pt-1" onSubmit={handleSubmit(submitRegisteredUser)}>
            <h2 className="text-center display-3 mb-3">Register</h2>
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
              <button type="submit" className='btn bg-slate-200 border-indigo-700 hover:border-black hover:bg-gray-800 hover:text-red-50 mt-4 '>Register</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login