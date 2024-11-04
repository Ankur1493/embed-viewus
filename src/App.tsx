import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HallOfFame from "./pages/HallOfFame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/w/embed-testimonial" element={<HallOfFame />} />
      </Routes>
    </Router>
  );
}

export default App;
