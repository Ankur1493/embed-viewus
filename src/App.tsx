import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import WallOfLove from "./pages/WallOfLove";
import TestimonialCarousals from "./components/TestimonialCarousals";
import TestimonialGrid from "./components/TestimonialGrid";
import axios from "axios";
import { TestimonialGrid2 } from "./components/grid/TestimonialGrid2";
import TestimonialCarousal2 from "./components/carousal/TestimonialCarousal2";
import TestimonialCarousalLong from "./components/carousal/TestimonialCarousalLong";
import TestimonialCarousalAnimated from "./components/carousal/TestimonialCarousalAnimated";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<TestimonialGrid2 testimonials={testimonials} />}
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
            element={
              <TestimonialCarousalAnimated testimonials={testimonials} />
            }
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
    </QueryClientProvider>
  );
}

export default App;
