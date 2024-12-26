import { Testimonial } from "@/interface";
import React from "react";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

interface TestimonialCarousalAnimatedProps {
  testimonials: Testimonial[];
}

const TestimonialCarousalAnimated: React.FC<
  TestimonialCarousalAnimatedProps
> = ({ testimonials }) => {
  console.log("testimonials in TestimonialCarousalAnimated:", testimonials);
  if (testimonials.length === 0) {
    return <div>No testimonials available</div>;
  }

  return <AnimatedTestimonials testimonials={testimonials} />;
};

export default TestimonialCarousalAnimated;
