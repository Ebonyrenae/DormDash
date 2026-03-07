import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./frontendscreens/HomePage";
//import JobBoard from "./frontendscreens/JobBoard";
//import MyRequests from "./frontendscreens/MyRequests";

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  if (currentPage === 'landing') {
    return <LandingPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'signup') {
    return <SignUpPage onNavigate={setCurrentPage} />;
  }

  return <LoginPage onNavigate={setCurrentPage} />;
}

function LandingPage({ onNavigate }) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      {/*  <Route path="/jobs" element={<JobBoard />} />
        <Route path="/requests" element={<MyRequests />} /> */}
      </Routes>
    </Router>
  );
}

