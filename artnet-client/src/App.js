import './App.css';
import Layout from './component/mainPage/Layout';
import LoginPage from './component/authentication/LoginPage';


function App() {
  return (
    <div className="App">
      {
        localStorage.getItem("user") == undefined ? <LoginPage /> : <Layout />
      }
    </div>
  );
}

export default App;
