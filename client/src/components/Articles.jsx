import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContextObj } from '../Context/UserContext';
import axios from 'axios';
import { get } from 'react-hook-form';

function Articles() {
  const { currentUser, setCurrentUser } = useContext(UserContextObj);
  const savedUser = localStorage.getItem('currentUser');
  const [articleList, setArticleList] = useState([]); // Initialize as empty array
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, [savedUser, setCurrentUser]);

  const token = localStorage.getItem('token');
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  async function getArticleList() {
    try {
      const res = await axiosWithToken.get(`http://localhost:4000/user-api/view-articles`);
      // console.log(res);
      if(res.data.message==="Articles list"){
        setArticleList(res.data.payload);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load articles. Please try again later.");
    }
  }
  //   getArticleList();
  useEffect(() => {
      getArticleList()
  }, []);

  async function viewArticle(articleId) {
    // console.log(articleId);
    navigate(`/articleById/${articleId}`);
  }

  if (!currentUser) {
    return (
      <div className="container">
        <h1 className="text-warning display-4 fst-italic mt-40%">Please log in to view this profile.</h1>
      </div>
    );
  }

  return (
    <div className="container">
      
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-center text-violet-700">Articles</h3>
          <div className="row w-9/12 mx-auto">
            {error ? (
              <p className="lead text-danger">{error}</p>
            ) : articleList && articleList.length === 0 ? (
              <p className="lead text-secondary">No articles.</p>
            ) : (
              articleList.map((ele, index) => (
                ele.status && (
                  <div className="card" key={index} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd' }}>
                    <h1 className="text-primary"><strong className="text-black">Title:</strong> {ele.title}</h1>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="text-violet-600">By: <b>{ele.username}</b></p>

                    </div>
                    <div className="rounded-pill border-secondary bg-gray-400 w-fit opacity-70">
                      <p className="text-center pt-1 pb-1 px-3">{ele.category}</p>
                    </div>
                    <p className="lead p-2 text-gray-800">
                      {ele.content.slice(0, 30)}...
                    </p>
                    <button className='btn btn-2 btn-outline-success' onClick={()=>viewArticle(ele.articleId)}>
                      view
                    </button>
                  </div>
                )
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Articles;
