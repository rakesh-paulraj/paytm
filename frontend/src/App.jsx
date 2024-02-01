  import { BrowserRouter,Routes,Route } from "react-router-dom";
  import{Signup} from "./pages/Signup";
  import{Dashboard} from "./pages/Dashboard";
  import{SendMoney}from "./pages/SendMoney";
  import{ Signin } from "./pages/Signin";
  import "./index.css";

  function App() {
  
  
   return <div><BrowserRouter>
  <Routes>
    <Route path="/signin" element={<Signin />}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/send" element={<SendMoney/>}/>
  </Routes>
  </BrowserRouter>
  </div>
  
  }

  export default App 

