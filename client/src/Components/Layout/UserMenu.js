import React from 'react'
import { Link } from 'react-router-dom'

function UserMenu() {
  return (
      <>
            <div className='text-center mt-4'>

           <h4>Dashboard</h4>
            <div class="list-group ">
                <Link to="/dashboard/user/profile" class="list-group-item list-group-item-action " aria-current="true">
                    Profile
                </Link>
                <Link to="/dashboard/user/orders" class="list-group-item list-group-item-action " aria-current="true">
                    Orders
                </Link>
            </div>
            </div>
        </>
  )
}

export default UserMenu
