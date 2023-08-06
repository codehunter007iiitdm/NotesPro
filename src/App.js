import Navbar from "./Components/Navbar"
import Home from './Components/Home'
import About from './Components/About'
import NoteState from './context/notes/NoteState'
import Login from "./Components/Login"
import { useState } from "react"
import Alert from "./Components/Alert"

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Signup from "./Components/Signup"
function App() {
  const[alert,setAlert]= useState(null)

  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })

    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  return (
    <>
    <NoteState>
    <Router>
        <Navbar />
        <Alert alert={alert}/>
        <Routes>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/Signup" element={<Signup showAlert={showAlert}/>} />
          <Route exact path="/" element={<Home showAlert={showAlert}/>} />
          <Route exact path="/about" element={<About/>} />
          </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
