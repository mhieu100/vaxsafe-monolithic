import { useNavigate } from 'react-router-dom';

const NotPermitted = () => {
  const navigate = useNavigate();
  return (
    <div className='text-center'>
      <h1>403</h1>
      <h5>Sorry, you are not authorized to access this page.</h5>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default NotPermitted;
