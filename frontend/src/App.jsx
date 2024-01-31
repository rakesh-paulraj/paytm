import { BrowserRouter,Routes,Route } from "react-router-dom";
import{Signup} from "./pages/Signup";
import{Dashboard} from "./pages/Dashboard";
import{SendMoney}from "./pages/SendMoney";
import{ Signin } from "./pages/Signin";

function App() {<>
<BrowserRouter>
<Routes>
  <Route path="/signin" element={<Signin />}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/send" elemnt={<SendMoney/>}/>
</Routes>
</BrowserRouter>
</>
}

export default App 

