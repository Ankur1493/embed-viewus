import React, { useState, useEffect } from "react";
import { testimonials } from "../data/testimonialData";
import TestimonialCard from "./TestimonialCard";
import { isValidColor } from "./IsValidColor";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const TestimonialGridHorizontal: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [textColor, setTextColor] = useState("");
  const [starColor, setStarColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [tagColor, setTagColor] = useState("");
  const [tagTextColor, setTagTextColor] = useState("");
  const [borderRadius, setBorderRadius] = useState("");
  const [radius, setRadius] = useState("");
  const [speed, setSpeed] = useState("");
  const [cardHeight, setCardHeight] = useState("");
  const [align, setAlign] = useState("");
  const [shadowColor, setShadowColor] = useState("");
  const [rowNumber, setRowNumber] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get("theme");
    const animated = urlParams.get("animated");
    const speedParam = urlParams.get("speed");
    const text = urlParams.get("text");
    const star = urlParams.get("star");
    const background = urlParams.get("background");
    const tagColor = urlParams.get("tag");
    const tagTextColor = urlParams.get("tagText");
    const cardBorderRadius = urlParams.get("cardBorderRadius");
    const divRadius = urlParams.get("radius");
    const Height = urlParams.get("height");
    const alignCard = urlParams.get("align");
    const shadowColor = urlParams.get("shadow");
    const row = urlParams.get("row");

    console.log("speedParam from URL:", speedParam);

    if (theme === "dark") setIsDarkTheme(true);
    if (animated === "on") setShouldAnimate(true);
    if (text) setTextColor(text);
    if (star) setStarColor(star);
    if (background) setBackgroundColor(background);
    if (tagColor) setTagColor(tagColor);
    if (tagTextColor) setTagTextColor(tagTextColor);
    if (cardBorderRadius) setBorderRadius(cardBorderRadius);
    if (divRadius) setRadius(divRadius);
    if (speedParam) setSpeed(speedParam);
    if (Height) setCardHeight(Height);
    if (alignCard) setAlign(alignCard);
    if (shadowColor) setShadowColor(shadowColor);
    if (row) setRowNumber(row);
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
      : "10px";

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

  let rows = 1;
  if (rowNumber === "two") {
    rows = 2;
  }
  return (
    <div
      className="overflow-hidden relative"
      style={{ borderRadius: containerRadius }}
    >
      {shouldAnimate ? (
        <>
          <div
            className="absolute top-0 left-0 bottom-0 w-16 opacity-70 z-20"
            style={{
              background: isValidColor(shadowColor)
                ? `linear-gradient(90deg,${shadowColor}, transparent)`
                : "",
              borderTopLeftRadius: containerRadius,
              borderBottomLeftRadius: containerRadius,
            }}
          ></div>

          <div
            className="absolute top-0 right-0 bottom-0 w-16 opacity-70 z-20"
            style={{
              background: isValidColor(shadowColor)
                ? `linear-gradient(90deg,transparent, ${shadowColor})`
                : "",
              borderTopRightRadius: containerRadius,
              borderBottomRightRadius: containerRadius,
            }}
          ></div>
          <div
            className={`grid gap-4 p-4 ${alignmentClass} place-items-center`}
          >
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed={duration}
              backgroundColor={backgroundColor}
              textColor={textColor}
              isDarkTheme={isDarkTheme}
              cardBorderRad={cardBorderRad}
              starColor={starColor}
              tagColor={tagColor}
              tagTextColor={tagTextColor}
              cardHeight={cardHeight}
              shadowColor={shadowColor}
            />
            {rows === 2 && (
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed={duration}
                backgroundColor={backgroundColor}
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
          className={`grid grid-rows-${rows} grid-flow-col gap-4 p-4 overflow-x-auto h-full ${alignmentClass}`}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              index={index}
              testimonial={testimonial}
              backgroundColor={backgroundColor}
              textColor={textColor}
              isDarkTheme={isDarkTheme}
              cardBorderRad={cardBorderRad}
              starColor={starColor}
              tagColor={tagColor}
              tagTextColor={tagTextColor}
              cardHeight={cardHeight}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialGridHorizontal;
