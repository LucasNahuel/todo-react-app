import logo from './logo.svg';
import './App.css';
import CustomHeader from './CustomHeader';
import CreateTask from './CreateTask';
import SignIn from './SignIn';

function App() {
  return (
    <div className="App">
      <CustomHeader></CustomHeader>

      <SignIn/>
    </div>
  );
}

export default App;
