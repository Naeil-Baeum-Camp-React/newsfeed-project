import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../contexts/login.context.jsx';
import { getUserData } from '../utils/superBaseFunc.jsx';

function HomePage() {
  const { userData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      if (userData.isLogedIn) {
        const data = await getUserData(userData.id);
        console.log(data.length === 0);
        // 유저 객체 존재 여부에 따라
        if (data) {
          return navigate(`/join/info`);
        } else {
          return navigate(`/${userData.id}/blog/posts`);
        }
      } else {
        return navigate(`/login`);
      }
    }
    init();
  }, [userData]);

  return <div></div>;
}

export default HomePage;
