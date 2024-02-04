  import { BrowserRouter,Routes,Route } from "react-router-dom";
  import{Signup} from "./pages/Signup";
  import{Dashboard} from "./pages/Dashboard";
  import{SendMoney}from "./pages/SendMoney";
  import{ Signin } from "./pages/Signin";
  
  import "./index.css";
import { Balancepage } from "./pages/Balancepage";

  function App() {
  
  
   return <div><BrowserRouter>
  <Routes>
    <Route path="/" element={<Signin />}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/send" element={<SendMoney/>}/>
    <Route path="/balance" element={<Balancepage/>}/>
    
  </Routes>
  </BrowserRouter>
  </div>
  
  }

  export default App 

