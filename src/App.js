import './App.css';
import Navigationbar from './components/Navigationbar';

function App() {
  return (
    <div className='App'>
      <Navigationbar isLoggedIn={true} />
    </div>
  );
}

export default App;
