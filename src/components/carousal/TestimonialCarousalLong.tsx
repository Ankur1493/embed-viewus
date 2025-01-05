import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "@/interface";
import { isValidColor } from "../IsValidColor";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import TestimonialCardLong from "./TestimonialCardLong";
import { ArrowUpRight } from "lucide-react";

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
    imageBackground: "",
    quoteColor: "",
    cardBorderRadius: "",
    cardBorderColor: "",
    outerRadius: "",
    speed: "",
    cardHeight: "",
    align: "",
    shadowColor: "",
    rows: "",
    direction1: "",
    direction2: "",
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
      imageBackground: urlParams.get("image") || prevState.imageBackground,
      quoteColor: urlParams.get("quote") || prevState.quoteColor,
      cardBorderRadius:
        urlParams.get("cardBorderRadius") || prevState.cardBorderRadius,
      cardBorderColor:
        urlParams.get("cardBorderColor") || prevState.cardBorderColor,
      outerRadius: urlParams.get("outerRadius") || prevState.outerRadius,
      speed: urlParams.get("speed") || prevState.speed,
      cardHeight: urlParams.get("height") || prevState.cardHeight,
      align: urlParams.get("align") || prevState.align,
      shadowColor: urlParams.get("shadow") || prevState.shadowColor,
      rows: urlParams.get("rows") || prevState.rows,
      direction1: urlParams.get("direction1") || prevState.direction1,
      direction2: urlParams.get("direction2") || prevState.direction2,
    }));
  }, []);

  const validDirection1 =
    themeState.direction1 === "left" || themeState.direction1 === "right"
      ? themeState.direction1
      : "right";

  const validDirection2 =
    themeState.direction2 === "left" || themeState.direction2 === "right"
      ? themeState.direction2
      : "left";

  const noOfRows = themeState.rows === "2" ? 2 : 1;

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
          className="overflow-hidden relative w-full h-full py-10"
          style={{
            borderRadius: containerRadius,
            background: isValidColor(themeState.backgroundColor)
              ? `#${themeState.backgroundColor}`
              : "transparent",
          }}
        >
          <div className="absolute -bottom-2 right-0 p-4 z-50">
            <button
              className="flex gap-2 justify-center items-center bg-white text-black rounded-full pr-4 py-1 group border shadow-md hover:bg-gradient-to-r from-sky-500 to-pink-400 transform transition-all hover:scale-105 duration-300 ease-in-out "
              onClick={() => window.open("https://viewus.in/login", "_blank")}
            >
              <div className="group-hover:bg-white rounded-full p-1 ">
                <img
                  src="https://d3eyp937ijscg0.cloudfront.net/viewus_image/logo1.png"
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
          <div
            className={`grid h-full relative grid-flow-col gap-4 p-4 place-items-center`}
            style={{
              borderRadius: containerRadius,
              background: isValidColor(themeState.backgroundColor)
                ? `#${themeState.backgroundColor}`
                : "transparent",
            }}
          >
            {" "}
            <div
              className={`absolute py-1 inset-y-0 left-0 w-1/4 z-50 pointer-events-none  rounded-lg `}
              style={{
                background: `linear-gradient(to right, #${
                  isValidColor(themeState.shadowColor)
                    ? themeState.shadowColor
                    : ""
                }, transparent)`,
              }}
            />
            <div
              className={`absolute inset-y-0 right-0 w-1/4 z-50 pointer-events-none  rounded-lg `}
              style={{
                background: `linear-gradient(to left, #${
                  isValidColor(themeState.shadowColor)
                    ? themeState.shadowColor
                    : ""
                }, transparent)`,
              }}
            />
            {noOfRows === 2 ? (
              <div
                className="grid grid-rows-2 gap-4 relative"
                style={{ borderRadius: containerRadius }}
              >
                <InfiniteMovingCards
                  items={testimonials}
                  direction={validDirection1}
                  speed={duration}
                  cardBackgroundColor={themeState.cardBackgroundColor}
                  textColor={themeState.textColor}
                  isDarkTheme={themeState.isDarkTheme}
                  cardBorderRad={cardBorderRad}
                  starColor={themeState.starColor}
                  tagColor={themeState.tagColor}
                  tagTextColor={themeState.tagTextColor}
                  imageBackground={themeState.imageBackground}
                  quoteColor={themeState.quoteColor}
                  cardHeight={themeState.cardHeight}
                  cardBorderColor={themeState.cardBorderColor}
                  card={"longCard"}
                  startIndex={0}
                />
                <InfiniteMovingCards
                  items={testimonials}
                  direction={validDirection2}
                  speed={duration}
                  cardBackgroundColor={themeState.cardBackgroundColor}
                  textColor={themeState.textColor}
                  isDarkTheme={themeState.isDarkTheme}
                  cardBorderRad={cardBorderRad}
                  starColor={themeState.starColor}
                  tagColor={themeState.tagColor}
                  tagTextColor={themeState.tagTextColor}
                  imageBackground={themeState.imageBackground}
                  quoteColor={themeState.quoteColor}
                  cardHeight={themeState.cardHeight}
                  cardBorderColor={themeState.cardBorderColor}
                  card={"longCard"}
                  startIndex={Math.floor(testimonials.length / 2)}
                />
              </div>
            ) : (
              <InfiniteMovingCards
                items={testimonials}
                direction={validDirection1}
                speed={duration}
                cardBackgroundColor={themeState.cardBackgroundColor}
                textColor={themeState.textColor}
                isDarkTheme={themeState.isDarkTheme}
                cardBorderRad={cardBorderRad}
                starColor={themeState.starColor}
                tagColor={themeState.tagColor}
                tagTextColor={themeState.tagTextColor}
                imageBackground={themeState.imageBackground}
                quoteColor={themeState.quoteColor}
                cardHeight={themeState.cardHeight}
                cardBorderColor={themeState.cardBorderColor}
                card={"longCard"}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            className="relative w-full mx-auto py-6 px-4 md:px-10"
            style={{
              borderRadius: containerRadius,
              background: isValidColor(themeState.backgroundColor)
                ? `#${themeState.backgroundColor}`
                : "transparent",
            }}
          >
            <div className="absolute -bottom-8 right-4 z-50">
              <button
                className="flex gap-2 justify-center bg-white items-center text-black rounded-full pr-4 py-1 group border shadow-md hover:bg-gradient-to-r from-sky-500 to-pink-400 transform transition-all hover:scale-105 duration-300 ease-in-out "
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
                  className="flex-shrink-0 py-1 flex justify-center items-center px-2 snap-center max-w-xl"
                >
                  <TestimonialCardLong
                    index={index}
                    testimonial={testimonial}
                    cardBackgroundColor={themeState.cardBackgroundColor}
                    textColor={themeState.textColor}
                    isDarkTheme={themeState.isDarkTheme}
                    cardBorderRad={cardBorderRad}
                    starColor={themeState.starColor}
                    imageBackground={themeState.imageBackground}
                    quoteColor={themeState.quoteColor}
                    tagColor={themeState.tagColor}
                    tagTextColor={themeState.tagTextColor}
                    cardBorderColor={themeState.cardBorderColor}
                    cardHeight={themeState.cardHeight}
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center opacity-60">
              <Button
                variant="outline"
                size="icon"
                className="w-6 h-6 md:h-8 md:w-8 rounded-full"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center opacity-60">
              <Button
                variant="outline"
                size="icon"
                className="w-6 h-6 md:h-8 md:w-8 rounded-full"
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
