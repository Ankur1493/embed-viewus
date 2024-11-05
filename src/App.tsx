import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HallOfFame from "./pages/HallOfFame";
import WallOfLove from "./pages/WallOfLove";
import WallOfLoveTestimonials from "./pages/WallOfLoveTestimonials";
import TestimonialGridHorizontal from "./components/TestimonialGridHorizontal";
import TestimonialGridUpward from "./components/TestimonialGridVertical";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestimonialGridUpward />} />
        <Route path="/w/hall-of-fame" element={<HallOfFame />} />
        <Route path="/w/wall-of-love" element={<WallOfLove />} />
        <Route
          path="/w/embed-testimonials"
          element={<WallOfLoveTestimonials />}
        />
        <Route
          path="/w/embed-testimonials/carousal"
          element={<TestimonialGridHorizontal />}
        />
      </Routes>
    </Router>
  );
}

export default App;
