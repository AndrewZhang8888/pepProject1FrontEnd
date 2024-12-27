import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ManagerPage() {
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    const storedOccupation = localStorage.getItem('postedBy'); // Retrieve postedBy from localStorage
    const storedDepartment = localStorage.getItem('department');
//    setDepartment(storedDepartment);  // Get department from localStorage
  }, []);

  const handleResolveTicketClick = () => {
    navigate('/resolveTicket');
  };

  return (
    <div>
      <h1>Welcome to the Manager Dashboard</h1>
      <p>This is the manager-specific page.</p>
      <button onClick={handleResolveTicketClick}>View Reports</button>
      {department && <p>Your department is: {department}</p>}
    </div>
  );
}

export default ManagerPage;
