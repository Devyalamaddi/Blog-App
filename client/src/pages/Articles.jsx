import { useEffect, useState } from 'react';
import { fetchArticles } from '../services/api';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      const res = await fetchArticles();
      setArticles(res.data.payload);
    };
    loadArticles();
  }, []);

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
