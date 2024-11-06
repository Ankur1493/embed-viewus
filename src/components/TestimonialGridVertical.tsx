import React, { useState, useEffect } from "react";
import { testimonials } from "../data/testimonialData";
import InfiniteMovingCards from "./ui/vertical-moving-cards";

const TestimonialGridUpward: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [textColor, setTextColor] = useState("");
  const [_, setShouldAnimate] = useState(false);
  const [starColor, setStarColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [tagColor, setTagColor] = useState("");
  const [tagTextColor, setTagTextColor] = useState("");
  const [borderRadius, setBorderRadius] = useState("");
  const [radius, setRadius] = useState("");
  const [shadowColor, setShadowColor] = useState("");
  const [speed, setSpeed] = useState("");

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
    const shadowColor = urlParams.get("shadow");

    if (theme === "dark") setIsDarkTheme(true);

    if (animated === "on") setShouldAnimate(true);

    if (text) setTextColor(text);

    if (star) setStarColor(star);

    if (background) setBackgroundColor(background);

    if (tagColor) setTagColor(tagColor);

    if (tagTextColor) setTagTextColor(tagTextColor);

    if (shadowColor) setShadowColor(shadowColor);

    if (cardBorderRadius) setBorderRadius(cardBorderRadius);

    if (divRadius) setRadius(divRadius);

    if (speedParam) setSpeed(speedParam);

    if (shadowColor) setShadowColor(shadowColor);
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

  let duration: "normal" | "slow" | "fast" | undefined = "slow";
  if (speed === "medium") {
    duration = "normal";
  } else if (speed === "high") {
    duration = "fast";
  } else {
    duration = "slow";
  }

  return (
    <div className="flex items-center justify-center mx-20">
      <div
        className="flex gap-4 relative min-w-[90vw] max-w-screen h-[90vh]"
        style={{ borderRadius: containerRadius }}
      >
        <InfiniteMovingCards
          items={testimonials}
          direction="up"
          speed={duration}
          backgroundColor={backgroundColor}
          textColor={textColor}
          isDarkTheme={isDarkTheme}
          cardBorderRad={cardBorderRad}
          starColor={starColor}
          tagColor={tagColor}
          tagTextColor={tagTextColor}
          shadowColor={shadowColor}
        />
        <InfiniteMovingCards
          items={testimonials}
          direction="up"
          speed={duration}
          backgroundColor={backgroundColor}
          textColor={textColor}
          isDarkTheme={isDarkTheme}
          cardBorderRad={cardBorderRad}
          starColor={starColor}
          tagColor={tagColor}
          tagTextColor={tagTextColor}
          shadowColor={shadowColor}
        />
        <InfiniteMovingCards
          items={testimonials}
          direction="up"
          speed={duration}
          backgroundColor={backgroundColor}
          textColor={textColor}
          isDarkTheme={isDarkTheme}
          cardBorderRad={cardBorderRad}
          starColor={starColor}
          tagColor={tagColor}
          tagTextColor={tagTextColor}
          shadowColor={shadowColor}
        />
        <InfiniteMovingCards
          items={testimonials}
          direction="up"
          speed={duration}
          backgroundColor={backgroundColor}
          textColor={textColor}
          isDarkTheme={isDarkTheme}
          cardBorderRad={cardBorderRad}
          starColor={starColor}
          tagColor={tagColor}
          tagTextColor={tagTextColor}
          shadowColor={shadowColor}
        />
      </div>
    </div>
  );
};

export default TestimonialGridUpward;
