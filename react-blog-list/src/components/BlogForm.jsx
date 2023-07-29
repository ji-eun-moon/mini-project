import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BlogForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const onSubmit = () => {
      axios.post('http://localhost:3001/posts', {
      title: title,
      body: body
      }).then(() => {
        navigate('/blogs')
      })
  }
  return (
    <div>
        <h1>Create a blog post</h1>
        <div className='mb-3'>
            <label className='form-label'>Title</label>
            <input 
            className='form-control'
            value={title}
            onChange={(event) => {
                setTitle(event.target.value)
            }}
            />
        </div>
        <div className='mb-3'>
            <label className='form-label'>Body</label>
            <textarea 
            className='form-control'
            value={body}
            onChange={(event) => {
                setBody(event.target.value)
            }}
            rows={20}
            />
        </div>
        <button 
            className='btn btn-primary'
            onClick={onSubmit}
            >Post</button>
    </div>
  )
}

export default BlogForm