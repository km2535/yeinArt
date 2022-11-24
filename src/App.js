import { Outlet } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./components/context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
    </div>
  );
}

export default App;
