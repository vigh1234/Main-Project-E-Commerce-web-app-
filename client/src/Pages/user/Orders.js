import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'

function Orders() {
  return (
    <Layout>
        <div className='container-fluid p-3 m-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                    <h3>All Orders</h3>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Orders
