import React from 'react'
import { Link } from 'react-router-dom'

function AdminMenu() {
    return (
        <>
            <div className='text-center mt-4'>

           <h4>Admin Panel</h4>
            <div class="list-group">
                <Link to="/dashboard/admin/create-category" class="list-group-item list-group-item-action " aria-current="true">
                    Create category
                </Link>
                <Link to="/dashboard/admin/create-product" class="list-group-item list-group-item-action " aria-current="true">
                    Create product
                </Link>
                <Link to="/dashboard/admin/products" class="list-group-item list-group-item-action " aria-current="true">
                    Products
                </Link>
                <Link to="/dashboard/admin/orders" class="list-group-item list-group-item-action " aria-current="true">
                    Orders
                </Link>
                <Link to="/dashboard/admin/users" class="list-group-item list-group-item-action " aria-current="true">
                    Users
                </Link>
            </div>
            </div>
        </>
    )
}

export default AdminMenu
