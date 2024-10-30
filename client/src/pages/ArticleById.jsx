import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserContextObj } from '../Context/UserContext';

function ArticleById() {
  const { currentUser } = useContext(UserContextObj);
  const { articleId } = useParams();
  const [article, setArticle] = useState(null); // state to hold article data
  const [error, setError] = useState(null); // optional error state
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [comments, setComments] = useState([]); // initialize as an empty array

  const token = localStorage.getItem('token');
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  async function getArticleById() {
    try {
      const response = await axiosWithToken.get(`http://localhost:4000/user-api/view-articles/${articleId}`);
      setArticle(response.data.payload[0]); // update state with article data
      setComments(response.data.payload[0].comments || []); // set comments from article data or empty array
    } catch (err) {
      setError("Failed to load article. Please try again later.");
      console.error(err);
    }
  }

  async function postComment(commentObj) {
    commentObj.username = currentUser.username;
    try {
      const response = await axiosWithToken.post(`http://localhost:4000/user-api/comment/${articleId}`, commentObj);
      console.log(response);
      setComments((prevComments) => [...prevComments, commentObj]); // Add new comment to comments state
    } catch (err) {
      setError("Failed to post comment. Please try again.");
      console.error(err);
    }
  }

  useEffect(() => {
    getArticleById();
  }, [articleId]);

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className='container'>
      <p>Article ID: {articleId}</p>
      {article ? (
        <>
          <h3>Title: <b className='text-primary fw-semibold fs-3'>{article.title}</b></h3>
          <div className="d-flex justify-content-between align-items-center">
            <p className="text-violet-600">By: <b>{article.username}</b></p>
          </div>
          <div className="rounded-pill border-secondary bg-gray-400 w-fit opacity-70">
            <p className="text-center pt-1 pb-1 px-3">{article.category}</p>
          </div>
          <p className="mt-4 p-3">{article.content}</p>
        </>
      ) : (
        <p>Loading article...</p>
      )}

      <p>Add comment</p>
      <form onSubmit={handleSubmit(postComment)}>
        <textarea {...register('content', { required: 'Content is required' })} id="content" rows="3" className='w-3/5 form-control' />
        {errors.content && <p className="error-text">{errors.content.message}</p>}
        <button className='btn'>Post</button>
      </form>

      {/* comments section */}
      <div className="border border-red-500 mt-24">
        <div className="container">
          <div className="row">
            {comments.length === 0 ? (
              <p>No comments</p>
            ) : (
              [...comments].reverse().map((ele, index) => (
                <div className="card" key={index}>
                  <div className="card-header">
                    <p>Comment by: {ele.username}</p>
                  </div>
                  <div className="card-body">
                    {ele.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleById;
