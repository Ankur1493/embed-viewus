import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WallOfLove from "./pages/WallOfLove";
import TestimonialCarousals from "./components/TestimonialCarousals";
import TestimonialGrid from "./components/TestimonialGrid";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/w/wall-of-love" element={<WallOfLove />} />
        <Route path="/w/embed-testimonials" element={<TestimonialGrid />} />
        <Route
          path="/w/embed-testimonials/carousal"
          element={<TestimonialCarousals />}
        />
      </Routes>
    </Router>
  );
}

export default App;
