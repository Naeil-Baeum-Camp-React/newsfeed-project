import { useUser } from '../contexts/login.context.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function HomePage() {
  const { userData } = useUser();
  const navigate = useNavigate()

  useEffect(() => {
    if (userData.isLogedIn){
      navigate(`/${userData.userId}/blog/posts`);
    } else {
      navigate(`/login`);
    }
  });

  return (
    <div></div>
  );
}

export default HomePage;