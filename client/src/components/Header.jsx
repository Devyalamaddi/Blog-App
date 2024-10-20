import React from 'react'
import {Link, NavLink} from 'react-router-dom'

function Header() {
  return (
    <nav className='shadow d-flex justify-content-between p-2 bg'>
      <div>
        <Link className='nav-link' to=''>Logo</Link>
      </div>
      <div className='d-flex gap-3'>
        <NavLink className="nav-link  hover:text-fuchsia-600 focus:text-orange-600" to='/'>home</NavLink>
        <NavLink className="nav-link  hover:text-fuchsia-600  focus:text-orange-600" to='/login'>login</NavLink>
        <NavLink className="nav-link  hover:text-fuchsia-600 focus:text-orange-600" to='/signup'>Signup</NavLink>
      </div>
    </nav>
  )
}

export default Header