//import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/login";
import Register from "./pages/register";
import Groups from "./pages/group/Groups";
import Group from "./pages/group/Group";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <main>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:id" element={<Group />} />
        </Routes>
      </Router>
       <div className="flex flex-col m-1 p-1 text-black">
			
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR 
				</p>
			</div> 
    </main>
  );
}

export default App;
