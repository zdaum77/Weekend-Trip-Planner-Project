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
import TripPlanner from "./pages/TripPlanner";
import EditDestination from "./pages/EditDestination";

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
        <Route path="/TripPlanner/:id" element={<TripPlanner />} />
        <Route path="/editDestination/:id" element={<EditDestination />} />

      </Routes>
      <Toaster position="top-right" theme="dark" />
    </Router>
  );
}

export default App;
