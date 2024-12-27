import React, { useState, useEffect } from 'react';

function EmployeePage() {
    const [messages, setMessages] = useState([]); // State to store the messages
    const [error, setError] = useState(null); // State to handle errors
    const [occupation, setOccupation] = useState(null); // State to store occupation

    useEffect(() => {
      const storedOccupation = localStorage.getItem('postedBy'); // Retrieve postedBy from localStorage
      setOccupation(storedOccupation); // Save it in state

      fetch('http://localhost:8080/messages') // Fetch messages from the endpoint
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch messages');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // Log the data to debug
          setMessages(data); // Save messages in state
        })
        .catch((err) => setError(err.message)); // Handle errors
    }, []);

    return (
      <div>
        <h1>User Tickets</h1>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {messages.length > 0 ? (
          <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Message</th>
                <th>ResState</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {messages
                .filter(
                  (message) =>
//                    message.resState === 'pending'
                    message.postedBy === parseInt(occupation, 10)
                )
                .map((message) => (
                  <tr key={message.ticketId}>
                    <td>{message.ticketId}</td>
                    <td>{message.messageText}</td>
                    <td>{message.resState}</td>
                    <td>{message.amount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No messages available.</p>
        )}
      </div>
    );
}

export default EmployeePage;
