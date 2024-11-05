import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HallOfFame from "./pages/HallOfFame";
import WallOfLove from "./pages/WallOfLove";
import WallOfLoveTestimonials from "./pages/WallOfLoveTestimonials";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/w/hall-of-fame" element={<HallOfFame />} />
        <Route path="/w/wall-of-love" element={<WallOfLove />} />
        <Route
          path="/w/embed-testimonials"
          element={<WallOfLoveTestimonials />}
        />
      </Routes>
    </Router>
  );
}

export default App;
