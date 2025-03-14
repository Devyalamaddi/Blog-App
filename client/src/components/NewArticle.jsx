import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContextObj } from '../Context/UserContext';
import axios from 'axios';

function NewArticle() {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });
    const { currentUser, count, setCount } = useContext(UserContextObj);
    const [errorMessage, setErrorMessage] = useState(null);
    const token = localStorage.getItem('token');

    // Axios instance with auth headers
    const axiosWithToken = axios.create({
        baseURL: 'http://localhost:4000/author-api', // Base API URL
        headers: { Authorization: `Bearer ${token}` },
    });

    async function newArticleFunction(articleObj) {
        setErrorMessage(null); // Reset error message
        const newArticle = {
            ...articleObj,
            username: currentUser.username,
            articleId: Date.now(),
            dateOfCreation: new Date(),
            dateOfModification: new Date(),
            status: true,
            comments: []
        };

        try {
            const res = await axiosWithToken.post('/article', newArticle);
            console.log("Response from NewArticle:", res.data);
            setCount(count + 1);
            reset();
        } catch (error) {
            console.error("Error submitting new article:", error.response?.data || error.message);
            setErrorMessage(error.response?.data?.message || "An error occurred while submitting the article.");
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-violet-600 text-center mb-5">New Article</h1>
            
            {errorMessage && (
                <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit(newArticleFunction)} className="space-y-4">
                {/* Title & Category */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block font-medium text-gray-700 dark:text-gray-300">Title:</label>
                        <input
                            type="text"
                            {...register('title', { required: 'Title is required', maxLength: 50 })}
                            id="title"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="category" className="block font-medium text-gray-700 dark:text-gray-300">Category:</label>
                        <input
                            type="text"
                            {...register('category')}
                            id="category"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Content */}
                <div>
                    <label htmlFor="content" className="block font-medium text-gray-700 dark:text-gray-300">Content:</label>
                    <textarea
                        {...register('content', { required: 'Content is required' })}
                        id="content"
                        rows="6"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!isValid}
                    className="w-full bg-teal-800 hover:bg-red-500 text-white py-2 rounded transition disabled:opacity-50"
                >
                    Upload the Blog
                </button>
            </form>
        </div>
    );
}

export default NewArticle;
