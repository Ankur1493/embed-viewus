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
import IframeResizer from "./components/IframeResizer";

function App() {
  const [testimonials, setTestimonials] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `https://www.viewus.in/api/review/like?slug=${slug}`
        );
        setTestimonials(response.data.data.reviews);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTestimonials();
  }, [slug]);

  return (
    <IframeResizer>
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
        {/* <div className="fixed bottom-0 right-0 p-4">
        <button
          className="bg-gray-200 flex gap-2 justify-center items-center text-black rounded-full px-4 py-1 group border  hover:bg-gradient-to-r from-sky-500 to-pink-400  transition duration-300 ease-in-out scale-105"
          onClick={() => window.open("https://viewus.in/login", "_blank")}
        >
          <img src="/src/assets/images/logo.png" alt="" className="w-4 h-4" />
          <span className=" text-xs group-hover:text-white">
            Collect testimonials with Viewus
          </span>
        </button>
      </div> */}
      </Router>
    </IframeResizer>
  );
}

export default App;
