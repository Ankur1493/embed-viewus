import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/interface";
import TestimonialCard from "./TestimonialCard";
import { useSwipeable } from "react-swipeable";

interface SmallScreenTestimonialCarouselProps {
  testimonials: Testimonial[];
  themeState: any;
}

const SmallScreenTestimonialCarousel: React.FC<
  SmallScreenTestimonialCarouselProps
> = ({ testimonials, themeState }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="relative flex items-center justify-center w-full py-6"
      style={{
        borderRadius: themeState.outerRadius,
        background: themeState.backgroundColor
          ? `#${themeState.backgroundColor}`
          : "transparent",
      }}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${testimonials.length * 100}%`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 ">
              <div className=" max-w-sm h-full flex items-center justify-center">
                <TestimonialCard
                  index={index}
                  testimonial={testimonial}
                  cardBackgroundColor={themeState.cardBackgroundColor}
                  textColor={themeState.textColor}
                  isDarkTheme={themeState.isDarkTheme}
                  cardBorderRad={themeState.cardBorderRadius}
                  starColor={themeState.starColor}
                  tagColor={themeState.tagColor}
                  tagTextColor={themeState.tagTextColor}
                  cardHeight={themeState.cardHeight}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 shadow-md"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 shadow-md"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute bottom-2 left-0 right-0">
        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmallScreenTestimonialCarousel;
