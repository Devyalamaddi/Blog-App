import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AuthorLogin from './pages/AuthorLogin';
import UserLogin from './pages/UserLogin';
import Articles from './pages/Articles';
import UserRegistration from './pages/UserRegistration';
import AdminRegistration from './pages/AdminRegistration';
import AuthorRegistration from './pages/AuthorRegistration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/admin-registration" element={<AdminRegistration />} />
        <Route path="/author-registration" element={<AuthorRegistration />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/author-login" element={<AuthorLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </Router>
  );
}

export default App;
