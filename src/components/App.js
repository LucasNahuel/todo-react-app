import logo from './logo.svg';
import './App.css';
import CustomHeader from './CustomHeader';
import CreateTask from './CreateTask';

function App() {
  return (
    <div className="App">
      <CustomHeader></CustomHeader>

      <CreateTask></CreateTask>
    </div>
  );
}

export default App;
