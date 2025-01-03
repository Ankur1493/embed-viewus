import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial, ThemeState } from "@/interface";
import TestimonialCard from "./TestimonialCard";
import { useSwipeable } from "react-swipeable";

interface MediumScreenTestimonialCarouselProps {
  testimonials: Testimonial[];
  themeState: ThemeState;
}

const MediumScreenTestimonialCarousel: React.FC<
  MediumScreenTestimonialCarouselProps
> = ({ testimonials, themeState }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalGroups = Math.ceil(testimonials.length / 2);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalGroups - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalGroups - 1 ? 0 : prevIndex + 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true,
  });

  return (
    <div className="flex justify-center items-center w-full">
      <div
        {...handlers}
        className="relative w-full max-w-3xl mx-auto py-6"
        style={{
          borderRadius: themeState.outerRadius,
          background: themeState.backgroundColor
            ? `#${themeState.backgroundColor}`
            : "transparent",
        }}
      >
        <div className="absolute -bottom-4 right-4 z-50">
          <button
            className="flex gap-2 justify-center items-center bg-white text-black rounded-full pr-4 py-1 group border shadow-md hover:bg-gradient-to-r from-sky-500 to-pink-400 transform transition-all hover:scale-105 duration-300 ease-in-out "
            onClick={() => window.open("https://viewus.in/login", "_blank")}
          >
            <div className="group-hover:bg-white rounded-full p-1 ">
              <img
                src="/src/assets/images/logo.png"
                alt=""
                className="w-4 h-4"
              />
            </div>
            <span className=" text-xs font-semibold flex gap-1 group-hover:text-white">
              Collect testimonials with Viewus{" "}
              <ArrowUpRight
                className="w-4 h-4 group-hover:text-white"
                strokeWidth={2.75}
              />
            </span>
          </button>
        </div>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
              (_, groupIndex) => (
                <div
                  key={groupIndex}
                  className="w-full flex-shrink-0 flex gap-4 justify-center"
                >
                  {testimonials
                    .slice(groupIndex * 2, groupIndex * 2 + 2)
                    .map((testimonial, index) => (
                      <div key={index} className="min-w-0">
                        <TestimonialCard
                          index={groupIndex * 2 + index}
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
                    ))}
                </div>
              )
            )}
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
            {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
              (_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediumScreenTestimonialCarousel;
