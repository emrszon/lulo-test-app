import logo from './logo.svg';
import './App.scss';
import { populateBookings, populateRooms, populateUsers } from './Utils/Mocks';
import AppRouter from './Routes/AppRouter';
import Header from './Components/Header/Header';

function App() {
  populateRooms();
  populateUsers();
  populateBookings();
  return (
    <div className="App">
      <Header/>
      <AppRouter />
    </div>
  );
}

export default App;
