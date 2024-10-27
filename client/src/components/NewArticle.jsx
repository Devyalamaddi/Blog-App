import React, { useContext } from 'react';
import './NewArticle.css';
import { useForm } from 'react-hook-form';
import { UserContextObj } from '../Context/UserContext';
import axios from 'axios';

function NewArticle() {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });
    const { currentUser,count,setCount } = useContext(UserContextObj);
    const token = localStorage.getItem('token');

    // Create axios instance with token
    const axiosWithToken = axios.create({
        headers: { Authorization: `Bearer ${token}` }
    });

    async function newArticleFunction(articleObj) {
        articleObj = {
            ...articleObj,
            username: currentUser.username,
            articleId: Date.now(),
            dateOfCreation: new Date(),
            dateOfModification: new Date(),
            status: true,
            comments: []
        };

        try {
            const res = await axiosWithToken.post('http://localhost:4000/author-api/article', articleObj);
            console.log("Response from NewArticle:", res.data); // Fixed to use res.data
            setCount(count+1);
            reset(); // Reset form only if submission is successful
        } catch (error) {
            console.error("Error submitting new article:", error.response.data); // Log error details
        }
    }

    return (
        <div className="container">
            <div className="flex justify-center">
                <h1 className="display-5 text-center text-violet-600 new-article w-72 mt-5">New Article</h1>
            </div>
            <form className="form m-4 p-4" onSubmit={handleSubmit(newArticleFunction)}>
                <div className="d-flex gap-4">
                    <div className='flex-grow-1'>
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" {...register('title', { required: 'Title is required', maxLength: { value: 50, message: 'Max length is 50' } })} id="title" className="form-control" />
                        {errors.title && <p className="error-text">{errors.title.message}</p>}
                    </div>

                    <div className='flex-grow-1'>
                        <label htmlFor="category" className="form-label">Category:</label>
                        <input type="text" {...register('category')} id="category" className='form-control' />
                    </div>
                </div>

                <label htmlFor="content" className="form-label mt-4">Content:</label>
                <textarea {...register('content', { required: 'Content is required' })} id="content" rows="15" className='w-100 form-control' />
                {errors.content && <p className="error-text">{errors.content.message}</p>}

                <button type="submit" disabled={!isValid} className="btn border-green-600 mt-5 bg-teal-800 text-white hover:bg-red-500">
                    Upload the Blog
                </button>
            </form>
        </div>
    );
}

export default NewArticle;
