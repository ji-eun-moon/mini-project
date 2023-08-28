import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';

// Edit Page
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BlogForm({editing}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const [originalTitle, setOriginalTitle] = useState('');
  const [originalBody, setOriginalBody] = useState('');
  const [originalPublish, setOriginalPublish] = useState('');

  // 공개 여부 결정
  const [publish, setPublish] = useState(false);

  // Form validation
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  // Edit Page
  const {id} = useParams();
  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:3001/posts/${id}`)
      .then((response) => {
        // console.log(response.data)
        setTitle(response.data.title)
        setOriginalTitle(response.data.title)
        setBody(response.data.body)
        setOriginalBody(response.data.body)
        setPublish(response.data.publish)
        setOriginalPublish(response.data.publish)
      })
    }
  }, [id, editing])

  const isEdited = () => {
    return title !== originalTitle || body !== originalBody || publish !== originalPublish
  }

  const validateForm = () => {
    let validated = true
    if (title === '') {
      setTitleError(true)
      validated = false
    }

    if (body === '') {
      setBodyError(true)
      validated = false
    }
    return validated
  }

  const onSubmit = () => {
    setTitleError(false)
    setBodyError(false)
    if (validateForm()) {
      if (editing) {
        axios.patch(`http://localhost:3001/posts/${id}`, {
          title: title,
          body: body,
          publish: publish
        }) .then(() => {
          navigate(`/blogs/${id}`)
        })
      } else {
        axios.post('http://localhost:3001/posts', {
        title: title,
        body: body,
        publish: publish,
        createdAt: Date.now()
        }).then(() => {
          navigate('/admin')
        })
      }
   }
  }

  const goBack = () => {
    if (editing) {
    navigate(`/blogs/${id}`)
    } else {
      navigate('/blogs/')
    }
  }

  const onChangePublish = (event) => {
    setPublish(event.target.checked)
  }

  return (
    <div>
        <h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
        <div className='mb-3'>
            <label className='form-label'>Title</label>
            <input 
            className={`form-control ${titleError ? 'border-danger' : ""}`}
            value={title}
            onChange={(event) => {
                setTitle(event.target.value)
            }}
            />
          { titleError && <div className='text-danger'>
              Title is required
          </div> }
        </div>
        <div className='mb-3'>
            <label className='form-label'>Body</label>
            <textarea 
            className={`form-control ${bodyError ? 'border-danger' : ""}`}
            value={body}
            onChange={(event) => {
                setBody(event.target.value)
            }}
            rows={10}
            />
            { bodyError && <div className='text-danger'>
              Body is required
            </div>}
        </div>

        {/* 공개 여부 결정하기 */}
        <div className='form-check mb-3'>
            <input className='form-check-input'
                    type='checkbox'
                    checked={publish}
                    onChange={onChangePublish} />
            <label className='form-check-label'>
              Publish
            </label>
        </div>


        <button 
            className='btn btn-primary'
            onClick={onSubmit}
            disabled={editing && !isEdited()}
            >{editing ? 'Edit' : 'Post'}</button>
        <button 
          className='btn btn-danger ms-3'
          onClick={goBack}
          >Cancel</button>
    </div>
  )
}

BlogForm.propTypes = {
  editing: propTypes.bool
}

BlogForm.defaultProps = {
  editing: false
}

export default BlogForm