import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../components/LoadingSpinner'

function DetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPost = (id) => {
    axios.get(`http://localhost:3001/posts/${id}`)
    .then((res) => {
        setPost(res.data)
        setLoading(false)
    })
  }

  useEffect(() => {
    getPost(id)
  }, [])

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  }

  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <div>
        <h1>{post.title}</h1>
        <small class="text-muted">작성 시간 : {printDate(post.createdAt)}</small>
        <br />
        <p>{post.body}</p>
    </div>
  )
}

export default DetailPage