import React from "react";
import { Routes, Route} from 'react-router-dom'
import AuthContextProvider from "../contexts/AuthContext"
import Navbar from "./Navbar";
import Register from "./Register"
import Login from "./Login"
import Header from "./Header"
import Content from "./Content"
import User from "../commons/User"
import SearchUser from "../commons/SearchUser"

const App = () => {
  
  return (
    <AuthContextProvider>
    <div>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Header/>}/>
      <Route path="/searchUser/:user" element={<SearchUser/>}/>
      <Route path="/content/:movie" element={<Content/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/:usuario" element={<User/>}/>
      </Routes>
    </div>
    </AuthContextProvider>
  );
};

export default App;


