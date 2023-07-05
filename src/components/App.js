import logo from './logo.svg';
import './App.css';
import CustomHeader from './CustomHeader';
import CreateTask from './CreateTask';
import SignUp from './SignUp';

function App() {
  return (
    <div className="App">
      <CustomHeader></CustomHeader>

      <SignUp/>
    </div>
  );
}

export default App;
