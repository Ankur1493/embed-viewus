import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/interface";
import { isValidColor } from "../IsValidColor";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import TestimonialCardLong from "./TestimonialCardLong";

interface TestimonialCarousalProps {
  testimonials: Testimonial[];
}

const TestimonialCarousalLong: React.FC<TestimonialCarousalProps> = ({
  testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [themeState, setThemeState] = useState({
    isDarkTheme: false,
    shouldAnimate: false,
    textColor: "",
    starColor: "",
    cardBackgroundColor: "",
    backgroundColor: "",
    tagColor: "",
    tagTextColor: "",
    cardBorderRadius: "",
    outerRadius: "",
    speed: "",
    cardHeight: "",
    align: "",
    shadowColor: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setThemeState((prevState) => ({
      ...prevState,
      isDarkTheme: urlParams.get("theme") === "dark",
      shouldAnimate: urlParams.get("animated") === "on",
      textColor: urlParams.get("text") || prevState.textColor,
      starColor: urlParams.get("star") || prevState.starColor,
      cardBackgroundColor:
        urlParams.get("cardBackground") || prevState.cardBackgroundColor,
      backgroundColor: urlParams.get("background") || prevState.backgroundColor,
      tagColor: urlParams.get("tag") || prevState.tagColor,
      tagTextColor: urlParams.get("tagText") || prevState.tagTextColor,
      cardBorderRadius:
        urlParams.get("cardBorderRadius") || prevState.cardBorderRadius,
      outerRadius: urlParams.get("outerRadius") || prevState.outerRadius,
      speed: urlParams.get("speed") || prevState.speed,
      cardHeight: urlParams.get("height") || prevState.cardHeight,
      align: urlParams.get("align") || prevState.align,
      shadowColor: urlParams.get("shadow") || prevState.shadowColor,
    }));
  }, []);

  const cardBorderRad =
    themeState.cardBorderRadius === "low"
      ? "5px"
      : themeState.cardBorderRadius === "medium"
      ? "10px"
      : themeState.cardBorderRadius === "high"
      ? "20px"
      : "";

  const containerRadius =
    themeState.outerRadius === "low"
      ? "5px"
      : themeState.outerRadius === "medium"
      ? "10px"
      : themeState.outerRadius === "high"
      ? "20px"
      : "";

  let duration: "normal" | "slow" | "fast" | undefined = "slow";
  if (themeState.speed === "medium") {
    duration = "normal";
  } else if (themeState.speed === "high") {
    duration = "fast";
  } else {
    duration = "slow";
  }

  const scrollToCard = (index: number) => {
    if (carouselRef.current) {
      const cards = carouselRef.current.children;
      if (cards[index]) {
        const cardLeft = (cards[index] as HTMLElement).offsetLeft;
        const containerWidth = carouselRef.current.offsetWidth;
        const cardWidth = (cards[index] as HTMLElement).offsetWidth;
        const scrollPosition = cardLeft - (containerWidth - cardWidth) / 2;

        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

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

  useEffect(() => {
    scrollToCard(currentIndex);
  }, [currentIndex]);

  return (
    <>
      {themeState.shouldAnimate ? (
        <div
          className="overflow-hidden relative w-full h-full"
          style={{
            borderRadius: containerRadius,
            background: isValidColor(themeState.backgroundColor)
              ? `#${themeState.backgroundColor}`
              : "transparent",
          }}
        >
          <div
            className={`grid h-full grid-flow-col gap-4 p-4 place-items-center`}
            style={{
              background: isValidColor(themeState.backgroundColor)
                ? `#${themeState.backgroundColor}`
                : "transparent",
            }}
          >
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed={duration}
              cardBackgroundColor={themeState.cardBackgroundColor}
              textColor={themeState.textColor}
              isDarkTheme={themeState.isDarkTheme}
              cardBorderRad={cardBorderRad}
              starColor={themeState.starColor}
              tagColor={themeState.tagColor}
              tagTextColor={themeState.tagTextColor}
              cardHeight={themeState.cardHeight}
              shadowColor={themeState.shadowColor}
              card={"longCard"}
            />
          </div>
        </div>
      ) : (
        <>
          <div
            className="relative w-full mx-auto py-6 px-10"
            style={{
              borderRadius: containerRadius,
              background: isValidColor(themeState.backgroundColor)
                ? `#${themeState.backgroundColor}`
                : "transparent",
            }}
          >
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial._id}
                  className="flex-shrink-0 px-2 snap-center max-w-xl"
                >
                  <TestimonialCardLong
                    index={index}
                    testimonial={testimonial}
                    cardBackgroundColor={themeState.cardBackgroundColor}
                    textColor={themeState.textColor}
                    isDarkTheme={themeState.isDarkTheme}
                    cardBorderRad={cardBorderRad}
                    starColor={themeState.starColor}
                    tagColor={themeState.tagColor}
                    tagTextColor={themeState.tagTextColor}
                    cardHeight={themeState.cardHeight}
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center opacity-60">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center opacity-60">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
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
        </>
      )}
    </>
  );
};

export default TestimonialCarousalLong;
