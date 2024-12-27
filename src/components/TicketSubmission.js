// TicketSubmission.js
import React, { useState } from "react";
import axios from "axios";

const TicketSubmission = () => {
    const [messageText, setMessageText] = useState("");
    const [amount, setAmount] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
//    const [occupation, setOccupation] = useState(null); // State to store occupation

    const handleSubmit = async (e) => {
        e.preventDefault();
          const storedOccupation = localStorage.getItem('postedBy'); // Retrieve postedBy from localStorage
//          setOccupation(storedOccupation);
        const ticketData = {
            messageText,
            amount: parseFloat(amount),
            postedBy: storedOccupation
        };

        try {
            const res = await axios.post("http://localhost:8080/messages", ticketData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setResponse(res.data);
            setError(null);
        } catch (err) {
            setResponse(null);
            setError(err.response ? err.response.data : "An error occurred");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
            <h1>Submit a Ticket</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="messageText">Message Text:</label>
                    <input
                        type="text"
                        id="messageText"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <button
                    type="submit"
                    style={{ padding: "10px 15px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                    Submit
                </button>
            </form>
            {response && (
                <div style={{ marginTop: "20px", color: "green" }}>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            {error && (
                <div style={{ marginTop: "20px", color: "red" }}>
                    <h3>Error:</h3>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default TicketSubmission;
