import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import Subjects from "./pages/Subjects";
import VideoList from "./pages/VideoList";
import VideoPlayer from "./pages/VideoPlayer";
import TeacherDashboard from "./pages/TeacherDashboard";
import UploadVideo from "./pages/UploadVideo";
import ManageVideos from "./pages/ManageVideos";
import Analytics from "./pages/Analytics";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./components/Layout";

function App(){

return(

<Router>
<Layout>

<Routes>

<Route path="/" element={<Login/>} />

<Route path="/dashboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard/></ProtectedRoute>} />

<Route path="/subjects" element={<ProtectedRoute allowedRoles={["student"]}><Subjects/></ProtectedRoute>} />

<Route path="/videos/:subject" element={<ProtectedRoute allowedRoles={["student"]}><VideoList /></ProtectedRoute>} />

<Route path="/player/:id" element={<ProtectedRoute allowedRoles={["student", "teacher", "admin"]}><VideoPlayer /></ProtectedRoute>} />

<Route path="/teacher/dashboard" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />

<Route path="/teacher/upload" element={<ProtectedRoute allowedRoles={["teacher"]}><UploadVideo /></ProtectedRoute>} />

<Route path="/teacher/manage" element={<ProtectedRoute allowedRoles={["teacher"]}><ManageVideos /></ProtectedRoute>} />

<Route path="/teacher/analytics" element={<ProtectedRoute allowedRoles={["teacher"]}><Analytics /></ProtectedRoute>} />

<Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminPanel /></ProtectedRoute>} />



</Routes>

</Layout>
</Router>

);

}

export default App;