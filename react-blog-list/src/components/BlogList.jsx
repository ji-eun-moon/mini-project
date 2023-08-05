import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from './Pagination.jsx';

import { useNavigate, useLocation } from 'react-router-dom';
import { bool } from 'prop-types';

function BlogList({isAdmin}) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get('page');

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const limit = 5;
  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts / limit))
  }, [numberOfPosts])

  const onClickPageButton = (page) => {
    navigate(`${location.pathname}?page=${page}`)
    getPosts(page)
  }

  const getPosts = (page = 1) => {

    let params = {
      _page: page,
      _limit: 5,
      _sort: 'id',
      _order: 'desc',
    }

    if (!isAdmin) { 
      params = { ...params, publish:true }
    }

    axios.get(`http://localhost:3001/posts`, {
      params : params
    })
    .then((response) => {
      // post 개수
      setNumberOfPosts(response.headers['x-total-count'])

      setPosts(response.data);
      // post 불러온 이후에 로딩중 상태 false로 변경
      setLoading(false);
    })
  }

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1)
    getPosts(parseInt(pageParam) || 1)
  }, [pageParam])

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

  if (loading) {
      return (
        <LoadingSpinner/>
      )
    }

  if (posts.length === 0) {
    return (<div>'No blog posts found'</div>)
  }

  const renderBlogList = () => {
    return posts.map(post => {
      return (
        <Card 
          key={post.id} 
          title={post.title} 
          onClick={() => navigate(`/blogs/${post.id}`)}>

          {isAdmin ? <button 
            className="btn btn-danger btn-sm" 
            onClick={(event) => deleteBlog(event, post.id)}>
            Delete</button> : null}
        </Card>
      )
  })
  } 

  return (
    <div>
      {renderBlogList()}

      { numberOfPages > 1 && (<Pagination currentPage={currentPage} 
                  numberOfPages={numberOfPages} 
                  onClick={onClickPageButton} />)}
    </div>
  )
    
}

BlogList.propTypes = {
  isAdmin: bool
}

BlogList.defaultProps = {
  isAdmin: false
}

export default BlogList