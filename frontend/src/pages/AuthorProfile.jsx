import React, { useContext, useEffect, useState } from 'react';
import { UserContextObj } from '../Context/UserContext';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";

function AuthorProfile() {
  const { currentUser, setCurrentUser, count, setCount } = useContext(UserContextObj);
  const savedUser = localStorage.getItem('currentUser');
  const [articleList, setArticleList] = useState([]);
  const [error, setError] = useState(null);

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
    if (!currentUser) return;
    try {
      const res = await axiosWithToken.get(`http://localhost:4000/author-api/view-articles/${currentUser.username}`);
      if (res.status === 200 && res.data.payload) {
        setArticleList(res.data.payload);
      } else {
        setError("Failed to fetch articles.");
      }
    } catch (err) {
      setError("An error occurred while fetching articles.");
      console.error(err);
    }
  }

  useEffect(() => {
    getArticleList();
  }, [currentUser,count]);

  const scrollToArticle = () => {
    const articleSection = document.getElementById('article-section');
    articleSection && articleSection.scrollIntoView({ behavior: 'smooth' });
  };

  async function deleteArticle(articleObjToDelete) {
    console.log("res from delete function", articleObjToDelete);
    const Id = articleObjToDelete.articleId;
    try {
      const res = await axiosWithToken.put(`http://localhost:4000/author-api/article/${Id.toString()}`);
      console.log("res from deleteAxios",res);
      if (res.status === 200) {
        setCount(count+1);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  }

  if (!currentUser) {
    return <div className="container"><h1 className='text-warning display-4 fst-italic mt-40%'>Please log in to view this profile.</h1></div>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <div>
          <h1 className="display-6 ">Welcome, <span className="text-green-400">{currentUser.username}</span>!</h1>
          <p className='text-gray-500'>{currentUser.email}</p>
        </div>
        <div className='mt-4'>
          <Link to='article' className='text-green-800' onClick={scrollToArticle}>New article</Link>
        </div>
      </div>
      <div className="p-4">
        <div className='mb-4'>
          <h3 className="text-center text-violet-700">Your Articles</h3>
          <div className="row w-9/12 mx-auto">
            {error ? (
              <p className="lead text-danger">{error}</p>
            ) : articleList.length === 0 ? (
              <p className="lead text-secondary">No articles.</p>
            ) : (
              [...articleList].reverse().map((ele, index) => (
                ele.status && (
                  <div className="card" key={index} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd' }}>
                    <div className="d-flex justify-content-between">
                      <h1 className="text-primary display-6"><strong className='text-black'>Title:</strong> {ele.title}</h1>
                      <div className="d-flex gap-4">
                        <button className="w-fit middle none center rounded-lg bg-green-500 py-1 px-4 h-10 text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40" data-ripple-light="true">
                          <BiSolidEditAlt />
                        </button>
                        <button className="w-fit middle none center rounded-lg bg-pink-500 py-1 px-4 h-10 text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40" data-ripple-light="true" onClick={() => deleteArticle(ele)}>
                          <AiOutlineDelete />
                        </button>
                      </div>
                    </div>
                    <div className='rounded-pill border-secondary bg-gray-400 w-fit opacity-70'>
                      <p className="text-center pt-1 pb-1 px-3">{ele.category}</p>
                    </div>
                    <p className="lead p-2 text-gray-800">
                      {ele.content.slice(0, 30)}...
                    </p>
                  </div>
                )
              ))
            )}
          </div>
        </div>
        <div id='article-section'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;
