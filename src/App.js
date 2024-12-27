import logo from './logo.svg';
import './App.css';
import ResponsiveAppbar from './components/AppBar'
import Credentials from './components/Credentials'
import EmployeePage from './components/EmployeePage';
import EmployeeUserTicketPage from './components/EmployeeUserTicketPage';
import ManagerPage from './components/ManagerPage';
import TicketSubmission from './components/TicketSubmission';
import PendingTickets from './components/PendingTickets';


import {Routes, Route, BrowserRouter } from 'react-router-dom';


// function App() {
//   return (
//     <div className="App">
//     <header>
//       Login Page
//     </header>
//     <ResponsiveAppbar/>
//     <Credentials/>
//     </div>
//   );
// }

function App() {
  return (
    <div className = "App">
        <Routes>
          <Route path="/" element={<Credentials />} />
          <Route path="/employee" element={<><ResponsiveAppbar /><EmployeePage /></>} />
          <Route path="/userTickets" element={<><EmployeeUserTicketPage /></>} />
          <Route path="/managerPage" element={<><ManagerPage /></>} />
          <Route path="/addTicket" element={<><TicketSubmission /></>} />
          <Route path="/resolveTicket" element={<><PendingTickets /></>} />
        </Routes>
    </div>
  );
}

export default App;
