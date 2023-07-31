import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { bool } from 'prop-types';

// Edit Page
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BlogForm({editing}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  // Edit Page
  const {id} = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`)
    .then((response) => {
      // console.log(response.data)
      setTitle(response.data.title)
      setBody(response.data.body)
    })
  }, [])

  const onSubmit = () => {
      axios.post('http://localhost:3001/posts', {
      title: title,
      body: body,
      createdAt: Date.now()
      }).then(() => {
        navigate('/blogs')
      })
  }
  return (
    <div>
        <h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
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
            >{editing ? 'Edit' : 'Post'}</button>
    </div>
  )
}

BlogForm.propTypes = {
  editing: bool
}

BlogForm.defaultProps = {
  editing: false
}

export default BlogForm