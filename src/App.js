import logo from './logo.svg';
import './App.css';
import ResponsiveAppbar from './components/AppBar'
import Credentials from './components/Credentials'

function App() {
  return (
    <div className="App">
    <header>
      Login Page
    </header>
    <ResponsiveAppbar/>
    <Credentials/>
    </div>
  );
}

export default App;
