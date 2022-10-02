import logo from './logo.svg';
import './App.scss';
import { populateBookings, populateRooms, populateUsers } from './Utils/Mocks';
import AppRouter from './Routes/AppRouter';

function App() {
  populateRooms();
  populateUsers();
  populateBookings();
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <AppRouter />
    </div>
  );
}

export default App;
