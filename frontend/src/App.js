import {BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/login/loginPage";
import Home from './pages/home/homePage';
import Fleet from "./pages/fleet/fleetPage";
import Haul from "./pages/hauls/haul";
import Invoices from "./pages/invoices/invoices";
import Drivers from "./pages/drivers/drivers";
import Chat from "./pages/chat/chat";
import Trucks from "./pages/trucks/trucks";

function App() {

  const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/> } />
          <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/hauls" element={<Haul />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/trucks" element={<Trucks />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
