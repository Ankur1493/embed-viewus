import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import WallOfLove from "./pages/WallOfLove";
import TestimonialCarousals from "./components/TestimonialCarousals";
import TestimonialGrid from "./components/TestimonialGrid";
import axios from "axios";

function App() {
  const [testimonials, setTestimonials] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`/api/review/like?slug=${slug}`);
        setTestimonials(response.data.data.reviews);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTestimonials();
  }, [slug]);

  return (
    <Router>
      <Routes>
        <Route path="/w/wall-of-love" element={<WallOfLove />} />
        <Route
          path="/w/embed-testimonials"
          element={<TestimonialGrid testimonials={testimonials} />}
        />
        <Route
          path="/w/embed-testimonials/carousal"
          element={<TestimonialCarousals testimonials={testimonials} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
