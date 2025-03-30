import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContextObj } from '../Context/UserContext';
import axios from 'axios';

function NewArticle() {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });
    const { currentUser, count, setCount } = useContext(UserContextObj);
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
            const res = await axiosWithToken.post('https://blog-app-backend-17rk.onrender.com/author-api/article', articleObj);
            console.log("Response from NewArticle:", res.data);
            setCount(count + 1);
            reset(); // Reset form only if submission is successful
        } catch (error) {
            console.error("Error submitting new article:", error.response?.data || error.message);
        }
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold text-violet-600 dark:text-violet-400 text-center">New Article</h1>
            </div>
            
            <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mt-6 max-w-2xl mx-auto"
                onSubmit={handleSubmit(newArticleFunction)}
            >
                {/* Title & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="text-gray-700 dark:text-gray-300 font-semibold">Title:</label>
                        <input type="text" {...register('title', { required: 'Title is required', maxLength: { value: 50, message: 'Max length is 50' } })}
                            id="title" className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="category" className="text-gray-700 dark:text-gray-300 font-semibold">Category:</label>
                        <input type="text" {...register('category')} id="category"
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="mt-4">
                    <label htmlFor="content" className="text-gray-700 dark:text-gray-300 font-semibold">Content:</label>
                    <textarea {...register('content', { required: 'Content is required' })}
                        id="content" rows="10"
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                    />
                    {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={!isValid}
                    className="w-full mt-4 py-2 bg-teal-700 text-white font-semibold rounded-md hover:bg-teal-600 transition disabled:bg-gray-400"
                >
                    Upload the Blog
                </button>
            </form>
        </div>
    );
}

export default NewArticle;
