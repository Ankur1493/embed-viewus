import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import WallOfLove from "./pages/WallOfLove";
import TestimonialCarousals from "./components/TestimonialCarousals";
import TestimonialGrid from "./components/TestimonialGrid";
import axios from "axios";
import { TestimonialGrid2 } from "./components/grid/TestimonialGrid2";
import TestimonialCarousal2 from "./components/carousal/TestimonialCarousal2";
import TestimonialCarousalLong from "./components/carousal/TestimonialCarousalLong";
import TestimonialCarousalAnimated from "./components/carousal/TestimonialCarousalAnimated";
import Testimonial4Grid from "./components/grid/Testimonial4Grid";
import Testimonial5Grid from "./components/grid/Testimonial5Grid";
import Testimonial6Grid from "./components/grid/Testimonial6Grid";

function App() {
  const [testimonials, setTestimonials] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `https://viewus.in/api/review/like?slug=${slug}`
        );
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
        <Route
          path="/"
          element={<TestimonialGrid2 testimonials={testimonials} />}
        />
        <Route
          path="/w/grid"
          element={<Testimonial4Grid testimonials={testimonials} />}
        />
        <Route
          path="/w/grid5"
          element={<Testimonial5Grid testimonials={testimonials} />}
        />
        <Route
          path="/w/grid6"
          element={<Testimonial6Grid testimonials={testimonials} />}
        />
        <Route
          path="/w"
          element={<TestimonialCarousal2 testimonials={testimonials} />}
        />
        <Route
          path="/w/carousal"
          element={<TestimonialCarousalLong testimonials={testimonials} />}
        />
        <Route
          path="/w/carousal/animated"
          element={<TestimonialCarousalAnimated testimonials={testimonials} />}
        />
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
