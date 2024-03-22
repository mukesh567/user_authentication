import { Routes, Route, BrowserRouter } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Error from "./pages/Error"



const App = () => {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />

      </Routes>
      <Footer />
    </BrowserRouter>

  </>
}

export default App