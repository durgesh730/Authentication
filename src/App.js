import Header from "./component/Header";
import Login from "./component/Login";
import {Routes, Route} from 'react-router-dom'
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
// import Error from "./component/Error";

function App() {
  return (
    <> 
        <Header/>
        <Routes>
        <Route path= '/' element={<Login/>} ></Route> 
        <Route path= '/register' element={<Register/>} ></Route>
        <Route path= '/dashboard' element={<Dashboard/>} ></Route>
        {/* <Route path= '*' element={<Error/>} ></Route> */}
        </Routes>
    </>
  );
}

export default App;
