import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/login.context';

function LoginPage() {
  const { userData } = useUser();
  const navigate = useNavigate();
  if (userData.isLogedIn) {
    return navigate('/');
  }
  return <div>LoginPage</div>;
}

export default LoginPage;
