import { BrowserRouter,Routes,Route } from "react-router-dom"

function App() {<>
<BrowserRouter>
<Routes>
  <Route path="/signin" element={<Signin />}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/send" elemnt={<Send/>}/>
</Routes>
</BrowserRouter>
</>
}

export default App 

