import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RootPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Check if user is logged in
    navigate('/login');
    return () => {}
  }, []);

  return (
    <>
      <h1>Remote Unlock</h1>
    </>
  );
}
