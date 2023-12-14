import './index.css';
import Register from "./register";
import Login from "./Login";
import FirstPage from "./FirstPage";
import Community from "./Community";
import ChangePassword from "./ChangePassword";

function App() {
  return (
    <div className="App">
        <Register />
        <Login />
        <ChangePassword/>
        <Community />

    </div>
  );
}
export default App;