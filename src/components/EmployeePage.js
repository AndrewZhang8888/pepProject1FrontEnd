import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeePage() {
  const navigate = useNavigate();
  const [occupation, setOccupation] = useState(null);

  useEffect(() => {
    const storedOccupation = localStorage.getItem('occupation');
    setOccupation(storedOccupation);  // Get occupation from localStorage
  }, []);

  const handleAddTicketClick = () => {
    navigate('/addTicket');
  };

 const handlePendingTicketsClick = () => {
  navigate('/userTickets');
 };

  return (
    <div>
      <h1>Welcome to the Employee Dashboard</h1>
      <p>This is the employee-specific page.</p>
      <button onClick={handleAddTicketClick}>Add Ticket</button>
      <button onClick={handlePendingTicketsClick}>View User Tickets</button>
      {occupation && <p>Your occupation is: {occupation}</p>}
    </div>
  );
}

export default EmployeePage;