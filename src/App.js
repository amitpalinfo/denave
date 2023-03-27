import logo from "./logo.svg";
import "./App.css";
import Filter from "./component/Filter";
import Sidebar from "./component/Sidebar";
import Main from "./component/Main";
function App() {
  return (
    <div className="App">
      <div className="section">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
