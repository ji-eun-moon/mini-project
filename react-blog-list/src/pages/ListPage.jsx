import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

import { Link, useNavigate } from 'react-router-dom';

function ListPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const getPosts = () => {
    axios.get('http://localhost:3001/posts')
    .then((response) => {
      setPosts(response.data);
      // post 불러온 이후에 로딩중 상태 false로 변경
      setLoading(false);
    })
  }

  const deleteBlog = (event, id) => {
    // 이벤트 버블링 막기
    event.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`)

    // 삭제하려는 id와 같지 않은 post만 담아 posts 업데이트
    .then(() => {
      setPosts(prevPosts => {
        return prevPosts.filter(post => {
          return post.id !== id;
        })
      })
    })
  }

  useEffect(() => {
    getPosts();
  }, [])

  const renderBlogList = () => {
    if (loading) {
      return (
        <LoadingSpinner/>
      )
    }

    if (posts.length === 0) {
      return (<div>'No blog posts found'</div>)
    }

    return posts.map(post => {
      return (
        <Card 
          key={post.id} 
          title={post.title} 
          onClick={() => navigate("/blogs/edit")}>
          <button 
            className="btn btn-danger btn-sm" 
            onClick={(event) => deleteBlog(event, post.id)}>
            Delete</button>
        </Card>
      )
    })
  }
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h1>Blogs</h1>
        <div>
          <Link to="/blogs/create" className='btn btn-success'>Creat New</Link>
        </div>
      </div>
      {renderBlogList()}
    </div>
  )
}

export default ListPage