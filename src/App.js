import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";

import Dashboard from "./Pages/Teacher/Dashboard";
import UploadVideo from "./Pages/Teacher/UploadVideo";
import ManageVideos from "./Pages/Teacher/ManageVideos";
import Analytics from "./Pages/Teacher/Analytics";
import AdminPanel from "./Pages/Admin/AdminPanel";
import VideoPlayer from "./Pages/Student/VideoPlayer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/manage" element={<ManageVideos />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;