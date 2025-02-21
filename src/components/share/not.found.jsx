import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>404 Not Found</h1>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </>
  );
};

export default NotFound;
