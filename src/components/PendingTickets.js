import React, { useState, useEffect } from 'react';

const PendingTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:8080/messages'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setTickets(data); // Set fetched tickets
        } else {
          console.error('Failed to fetch tickets');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchTickets();
  }, []);

  const handleUpdateStatus = async (ticketId, newStatus) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.ticketId === ticketId ? { ...ticket, resState: newStatus } : ticket
    );
    setTickets(updatedTickets);

    try {
      const response = await fetch(`http://localhost:8080/messages/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageText: newStatus }), // Approve or deny
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Failed to update ticket status:', errorMessage);

        const revertTickets = tickets.map((ticket) =>
          ticket.ticketId === ticketId ? { ...ticket, resState: 'pending' } : ticket
        );
        setTickets(revertTickets);
      }
    } catch (error) {
      console.error('Error updating ticket status:', error);

      const revertTickets = tickets.map((ticket) =>
        ticket.ticketId === ticketId ? { ...ticket, resState: 'pending' } : ticket
      );
      setTickets(revertTickets);
    }
  };

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  // Filter only pending tickets
  const pendingTickets = tickets.filter((ticket) => ticket.resState === 'pending');

  return (
    <div className="pending-tickets">
      <h1>Pending Tickets</h1>
      {pendingTickets.length > 0 ? (
        <div className="tickets-list">
          {pendingTickets.map((ticket) => (
            <div key={ticket.id} className="ticket">
              <h2>{ticket.title}</h2>
              <p>{ticket.description}</p>
              <div>
                <strong>Status</strong>: {ticket.resState}{' '}
                <strong>ticketId</strong>: {ticket.ticketId}{' '}
                <strong>ticketText</strong>: {ticket.messageText}{' '}
                <strong>postedBy</strong>: {ticket.postedBy}{' '}
                <strong>amount</strong>: {ticket.amount}
              </div>
              <div className="ticket-actions">
                <button onClick={() => handleUpdateStatus(ticket.ticketId, 'approved')}>Approve</button>
                <button onClick={() => handleUpdateStatus(ticket.ticketId, 'denied')}>Deny</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No pending tickets available.</div>
      )}
    </div>
  );
};

export default PendingTickets;
