import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import Subjects from "./pages/Subjects";
import VideoList from "./pages/VideoList";
import VideoPlayer from "./pages/VideoPlayer";

function App(){

return(

<Router>

<Routes>

<Route path="/" element={<Login/>} />

<Route path="/dashboard" element={<StudentDashboard/>} />

<Route path="/subjects" element={<Subjects/>} />

<Route path="/videos/:subject" element={<VideoList />} />

<Route path="/player/:id" element={<VideoPlayer />} />



</Routes>

</Router>

);

}

export default App;