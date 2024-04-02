import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

function AdminDashboard() {
  const [auth]=useAuth()
  return (
   <Layout>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'><AdminMenu/></div>
            <div className='col-md-9 mt-1'>
              <div className='ms-5 p-3'>
                <h3> Hello, {auth?.user?.name}</h3>
                {/* <h3> Email:{auth?.user?.email}</h3>
                <h3> contact:{auth?.user?.phone}</h3> */}
              </div>
            </div>
          </div>
        </div>
   </Layout>
  )
}

export default AdminDashboard
