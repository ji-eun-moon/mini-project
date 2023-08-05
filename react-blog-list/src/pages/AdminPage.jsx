import React from 'react'
import BlogList from '../components/BlogList.jsx';
import { Link } from 'react-router-dom';

function AdminPage() {
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h1>Admin</h1>
        <div>
          <Link to="/blogs/create" className='btn btn-success'>Creat New</Link>
        </div>
      </div>
      <BlogList isAdmin={true}/>
    </div>
  )
}

export default AdminPage