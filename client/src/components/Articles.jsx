import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContextObj } from '../Context/UserContext';
import axios from 'axios';

function Articles() {
  const { currentUser, setCurrentUser } = useContext(UserContextObj);
  const savedUser = localStorage.getItem('currentUser');
  const [articleList, setArticleList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const navigate = useNavigate();

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
      if (res.data.message === "Articles list") {
        setArticleList(res.data.payload);
      }
    } catch (err) {
      setError("Failed to load articles. Please try again later.");
    } finally {
      setLoading(false); // ✅ Hide loader once data is fetched
    }
  }

  useEffect(() => {
    getArticleList();
  }, []);

  function viewArticle(articleId) {
    navigate(`/articleById/${articleId}`);
  }

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-warning text-3xl font-semibold">Please log in to view this profile.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-center text-primary font-bold text-2xl mb-4">📜 Articles</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // ✅ Loading Skeleton
          [...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-300 dark:bg-gray-700 p-4 rounded-lg shadow-md h-40"></div>
          ))
        ) : error ? (
          <p className="text-red-500 font-medium">{error}</p>
        ) : articleList.length === 0 ? (
          <p className="text-gray-500 text-center">No articles available.</p>
        ) : (
          articleList.map((ele, index) => (
            ele.status && (
              <div key={index} className="bg-card p-4 shadow-md rounded-lg border border-card-border transition-transform transform hover:scale-105">
                <h1 className="text-lg font-bold text-primary">
                  <strong className="text-text-primary">Title:</strong> {ele.title}
                </h1>
                <p className="text-secondary mt-2">By: <b>{ele.username}</b></p>
                <div className="inline-block bg-gray-300 dark:bg-gray-600 text-sm rounded-full px-3 py-1 mt-2 opacity-75">
                  {ele.category}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {ele.content.slice(0, 50)}...
                </p>
                <button
                  className="w-full mt-3 py-2 px-4 text-white bg-primary hover:bg-primary-hover transition rounded-lg"
                  onClick={() => viewArticle(ele.articleId)}
                >
                  View Article
                </button>
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
}

export default Articles;
