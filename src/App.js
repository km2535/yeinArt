import { Outlet } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./components/context/AuthContext";
import EnquireContextProvider from "./components/context/EnquireContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <EnquireContextProvider>
          <Outlet />
        </EnquireContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
