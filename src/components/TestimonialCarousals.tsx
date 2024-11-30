import React, { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import { isValidColor } from "./IsValidColor";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { Testimonial } from "@/interface";

interface TestimonialCarousalProps {
  testimonials: Testimonial[];
}

const TestimonialCarousals: React.FC<TestimonialCarousalProps> = ({
  testimonials,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [textColor, setTextColor] = useState("");
  const [starColor, setStarColor] = useState("");
  const [cardBackgroundColor, setCardBackgroundColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [tagColor, setTagColor] = useState("");
  const [tagTextColor, setTagTextColor] = useState("");
  const [borderRadius, setBorderRadius] = useState("");
  const [radius, setRadius] = useState("");
  const [speed, setSpeed] = useState("");
  const [cardHeight, setCardHeight] = useState("");
  const [align, setAlign] = useState("");
  const [shadowColor, setShadowColor] = useState("");
  const [rowNumber, setRowNumber] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get("theme");
    const animated = urlParams.get("animated");
    const speedParam = urlParams.get("speed");
    const text = urlParams.get("text");
    const star = urlParams.get("star");
    const cardBackground = urlParams.get("cardBackground");
    const tagColor = urlParams.get("tag");
    const tagTextColor = urlParams.get("tagText");
    const cardBorderRadius = urlParams.get("cardBorderRadius");
    const divRadius = urlParams.get("radius");
    const Height = urlParams.get("height");
    const alignCard = urlParams.get("align");
    const shadowColor = urlParams.get("shadow");
    const row = urlParams.get("row");
    const rows = row ? parseInt(row, 10) : null;
    const background = urlParams.get("background");

    if (theme === "dark") setIsDarkTheme(true);
    if (animated === "on") setShouldAnimate(true);
    if (text) setTextColor(text);
    if (star) setStarColor(star);
    if (cardBackground) setCardBackgroundColor(cardBackground);
    if (tagColor) setTagColor(tagColor);
    if (tagTextColor) setTagTextColor(tagTextColor);
    if (cardBorderRadius) setBorderRadius(cardBorderRadius);
    if (divRadius) setRadius(divRadius);
    if (speedParam) setSpeed(speedParam);
    if (Height) setCardHeight(Height);
    if (alignCard) setAlign(alignCard);
    if (shadowColor) setShadowColor(shadowColor);
    if (rows) setRowNumber(rows);
    if (background) setBackgroundColor(background);
  }, []);

  const cardBorderRad =
    borderRadius === "low"
      ? "5px"
      : borderRadius === "medium"
      ? "10px"
      : borderRadius === "high"
      ? "20px"
      : "";

  const containerRadius =
    radius === "low"
      ? "5px"
      : radius === "medium"
      ? "10px"
      : radius === "high"
      ? "20px"
      : "";

  const alignmentClass =
    align === "top"
      ? "items-start"
      : align === "center"
      ? "items-center"
      : align === "end"
      ? "items-end"
      : "items-start";

  let duration: "normal" | "slow" | "fast" | undefined = "slow";
  if (speed === "medium") {
    duration = "normal";
  } else if (speed === "high") {
    duration = "fast";
  } else {
    duration = "slow";
  }

  return (
    <div
      className="overflow-hidden relative w-full h-full"
      style={{
        borderRadius: containerRadius,
        background: isValidColor(backgroundColor)
          ? `#${backgroundColor}`
          : "transparent",
      }}
    >
      {shouldAnimate ? (
        <>
          <div
            className="absolute top-0 left-0 bottom-0 w-16 opacity-70 z-20"
            style={{
              background: isValidColor(shadowColor)
                ? `linear-gradient(90deg,#${shadowColor}, transparent)`
                : "",
              borderTopLeftRadius: containerRadius,
              borderBottomLeftRadius: containerRadius,
            }}
          ></div>

          <div
            className="absolute top-0 right-0 bottom-0 w-16 opacity-70 z-20"
            style={{
              background: isValidColor(shadowColor)
                ? `linear-gradient(90deg,transparent, #${shadowColor})`
                : "",
              borderTopRightRadius: containerRadius,
              borderBottomRightRadius: containerRadius,
            }}
          ></div>
          <div
            className={`grid h-full ${`grid-rows-${rowNumber}`} grid-flow-col gap-4 p-4 ${alignmentClass} place-items-center`}
            style={{
              background: isValidColor(backgroundColor)
                ? `#${backgroundColor}`
                : "transparent",
            }}
          >
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed={duration}
              cardBackgroundColor={cardBackgroundColor}
              textColor={textColor}
              isDarkTheme={isDarkTheme}
              cardBorderRad={cardBorderRad}
              starColor={starColor}
              tagColor={tagColor}
              tagTextColor={tagTextColor}
              cardHeight={cardHeight}
              shadowColor={shadowColor}
            />
            {rowNumber === 2 && (
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed={duration}
                cardBackgroundColor={cardBackgroundColor}
                textColor={textColor}
                isDarkTheme={isDarkTheme}
                cardBorderRad={cardBorderRad}
                starColor={starColor}
                tagColor={tagColor}
                tagTextColor={tagTextColor}
                cardHeight={cardHeight}
                shadowColor={shadowColor}
              />
            )}
          </div>
        </>
      ) : (
        <div
          className={`grid ${`grid-rows-${rowNumber}`} grid-flow-col gap-4 p-2 md:p-4 overflow-x-auto overflow-y-hidden ${
            rowNumber === 2 ? "h-full" : "h-fulll"
          }  md:h-full ${alignmentClass}`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              index={index}
              testimonial={testimonial}
              cardBackgroundColor={cardBackgroundColor}
              textColor={textColor}
              isDarkTheme={isDarkTheme}
              cardBorderRad={cardBorderRad}
              starColor={starColor}
              tagColor={tagColor}
              tagTextColor={tagTextColor}
              cardHeight={cardHeight}
              cardWidth="400"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousals;
