import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/interface";
import TestimonialCard from "./TestimonialCard";
import { isValidColor } from "../IsValidColor";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { useSwipeable } from "react-swipeable";
import SmallScreenTestimonialCarousel from "./SmallScreenTestimonialCarousal";
import MediumScreenTestimonialCarousel from "./MediumScreenTestimonialCarousal";

interface TestimonialCarousalProps {
  testimonials: Testimonial[];
}

const TestimonialCarousal2: React.FC<TestimonialCarousalProps> = ({
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

  const [cardsPerGroup, setCardsPerGroup] = useState(4);
  const [screenSize, setScreenSize] = useState("large");

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

    const numCards = parseInt(urlParams.get("cards") || "4", 5);
    setCardsPerGroup(isNaN(numCards) ? 4 : Math.max(1, Math.min(numCards, 4)));
  }, [testimonials.length]);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("small");
      } else if (window.innerWidth < 1024) {
        setScreenSize("medium");
      } else {
        setScreenSize("large");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let duration: "normal" | "slow" | "fast" | undefined = "slow";
  if (themeState.speed === "medium") {
    duration = "normal";
  } else if (themeState.speed === "high") {
    duration = "fast";
  } else {
    duration = "slow";
  }

  const getCardsPerView = () => {
    if (screenSize === "small") return 1;
    if (screenSize === "medium") return 2;
    return cardsPerGroup;
  };

  const totalGroups = Math.ceil(testimonials.length / getCardsPerView());

  const scrollToGroup = (index: number) => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const groupWidth = scrollWidth / totalGroups;
      carouselRef.current.scrollTo({
        left: groupWidth * index,
        behavior: "smooth",
      });
    }
  };

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

  useEffect(() => {
    scrollToGroup(currentIndex);
  }, [currentIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true,
  });

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
          {/* <div
            className="absolute top-0 left-0 bottom-0 w-8 opacity-70 z-20"
            style={{
              background: isValidColor(themeState.shadowColor)
                ? `linear-gradient(90deg,#${themeState.shadowColor}, transparent)`
                : "",
              borderTopLeftRadius: containerRadius,
              borderBottomLeftRadius: containerRadius,
            }}
          ></div>

          <div
            className="absolute top-0 right-0 bottom-0 w-8 opacity-70 z-20"
            style={{
              background: isValidColor(themeState.shadowColor)
                ? `linear-gradient(90deg,transparent, #${themeState.shadowColor})`
                : "",
              borderTopRightRadius: containerRadius,
              borderBottomRightRadius: containerRadius,
            }}
          ></div> */}
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
            />
          </div>
        </div>
      ) : (
        <>
          {screenSize === "small" ? (
            <SmallScreenTestimonialCarousel
              testimonials={testimonials}
              themeState={themeState}
            />
          ) : screenSize === "medium" ? (
            <MediumScreenTestimonialCarousel
              testimonials={testimonials}
              themeState={themeState}
            />
          ) : (
            <div
              {...handlers}
              className="relative w-full mx-auto py-6"
              style={{
                borderRadius: containerRadius,
                background: isValidColor(themeState.backgroundColor)
                  ? `#${themeState.backgroundColor}`
                  : "transparent",
              }}
            >
              <div
                ref={carouselRef}
                className="flex overflow-x-hidden snap-x snap-mandatory px-0"
              >
                {Array.from({ length: totalGroups }).map((_, groupIndex) => (
                  <div
                    key={groupIndex}
                    className={`flex items-${themeState.align} py-2 justify-center w-full flex-shrink-0 snap-center gap-4`}
                  >
                    {testimonials
                      .slice(
                        groupIndex * getCardsPerView(),
                        groupIndex * getCardsPerView() + getCardsPerView()
                      )
                      .map((testimonial, index) => (
                        <div
                          key={index}
                          className={`h-full px-0 flex py-1 items-${themeState.align} justify-center `}
                        >
                          <TestimonialCard
                            key={index}
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
                  {Array.from({ length: totalGroups }).map((_, index) => (
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
          )}
        </>
      )}
    </>
  );
};

export default TestimonialCarousal2;
