import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppBar from "./components/AppBar";
// import { Toaster } from "sonner";

// import for pages
import Home from "./pages/Home";

function App() {
  return (
    <>     
     <Router>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* <Toaster position="top-right" theme="dark" /> */}
    </Router>
    </>
  )
}

export default App
