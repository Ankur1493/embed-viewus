import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HallOfFame from "./pages/HallOfFame";
import WallOfLove from "./pages/WallOfLove";
import TestimonialGridHorizontal from "./components/TestimonialGridHorizontal";
import TestimonialGrid1 from "./components/TestimonialGrid1";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/w/hall-of-fame" element={<HallOfFame />} />
        <Route path="/w/wall-of-love" element={<WallOfLove />} />
        <Route path="/w/embed-testimonials" element={<TestimonialGrid1 />} />
        <Route
          path="/w/embed-testimonials/carousal"
          element={<TestimonialGridHorizontal />}
        />
      </Routes>
    </Router>
  );
}

export default App;
