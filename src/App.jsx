import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppBar from "./components/AppBar";
import { Toaster } from "sonner";

// import for pages
import Home from "./pages/Home";
import AddDestination from "./pages/AddDestination";
import Destination from "./pages/Destination";
import DestinationAndTrip from "./pages/DestinationAndTrip";
import Memory from "./pages/Memory";
import ViewPage from "./pages/ViewPage";
import EditTrip from "./pages/EditTrip";
import EditMemory from "./pages/EditMemory";
import EditDestination from "./pages/EditDestination";
// import EditDestination from "./pages/EditDestinationPage";

function App() {
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddDestination />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/yourdestination" element={<DestinationAndTrip />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/TripView/:id" element={<ViewPage />} />
        <Route path="/editTrip" element={<EditTrip />} />
        <Route path="/editMemory" element={<EditMemory />} />
        <Route path="/editDestination" element={<EditDestination />} />
        {/* <Route path="/edit/:id" element={<EditDestination />} /> */}
      </Routes>
      <Toaster position="top-right" theme="dark" />
    </Router>
  );
}

export default App;
