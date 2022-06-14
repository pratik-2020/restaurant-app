import logo from './logo.svg';
import './App.css';
import Register from './Components/Register';
import InsertMenu from './Components/InsertMenu';
import RetrieveMenu from './Components/Retrieve-Menu';
import InsertTable from './Components/InsertTable';
import { Routes, Route } from 'react-router-dom';
import OtpVerification from './Components/OtpVerification';
import Login from './Components/Login';
import GetMenu from './Components/GetMenu';
import Order from './Components/Order';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/otpverification' element={<OtpVerification />} />
        <Route path='/inserttable' element={<InsertTable />} />
        <Route path='/retrievetable' element={<Register />} />
        <Route path='/insertmenu' element={<InsertMenu />} />
        <Route path='/retrievemenu' element={<RetrieveMenu />} />
        <Route path='/order' element={<Order />} />
        <Route path='/order/:table' element={<GetMenu />} />
      </Routes>
    </div>
  );
}

export default App;
