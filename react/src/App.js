import './index.css';
import Register from "./register";
import Login from "./login";
import FirstPage from "./firstPage";
import Community from "./community";
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