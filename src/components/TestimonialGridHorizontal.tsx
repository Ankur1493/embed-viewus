import React, { useState, useEffect } from "react";
import { testimonials } from "../data/testimonialData";
import twitter from "../assets/images/twitter_logo.png";
import linkedIn from "../assets/images/linkedIn_logo.png";
import product from "../assets/images/ProductHunt_logo.png";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";

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
  const [speed, setSpeed] = useState("low");
  const [cardHeight, setCardHeight] = useState("");
  const [align, setAlign] = useState("");
  const [shadowColor, setShadowColor] = useState("");

  const isValidColor = (color: string) => {
    const s = new Option().style;
    s.color = color;
    return s.color !== "";
  };

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

  let duration = 50;
  if (speed === "medium") {
    duration = 35;
  } else if (speed === "high") {
    duration = 25;
  }

  const carouselVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div
      className="overflow-hidden relative"
      style={{ borderRadius: containerRadius }}
    >
      {shouldAnimate ? (
        <>
          {shouldAnimate && (
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
            </>
          )}
          <motion.div
            className={`grid grid-rows-1 grid-flow-col gap-4 p-4 ${alignmentClass}`}
            variants={carouselVariants}
            animate="animate"
          >
            {testimonials.map((testimonial, index) => (
              <Card
                key={`${testimonial.item}-${index}`}
                className={`border border-gray-200  ${
                  !isValidColor(backgroundColor) && isDarkTheme
                    ? "bg-gray-800"
                    : !isValidColor(backgroundColor) && !isDarkTheme
                    ? "bg-white"
                    : ""
                } ${
                  !isValidColor(textColor) && isDarkTheme
                    ? "text-white"
                    : !isValidColor(textColor) && !isDarkTheme
                    ? "text-black"
                    : ""
                }  min-w-[400px] max-w-[400px] h-full`}
                style={{
                  backgroundColor: isValidColor(backgroundColor)
                    ? backgroundColor
                    : undefined,
                  color: isValidColor(textColor) ? textColor : undefined,
                  borderRadius: cardBorderRad,
                  height: cardHeight === "fit" ? "fit-content" : "",
                }}
              >
                <CardHeader className="flex flex-row justify-between items-start py-0 pt-4 pb-2">
                  <div className="flex flex-row items-center gap-2">
                    {testimonial.avatar && (
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          src={testimonial.avatar}
                          alt={`${testimonial.author}'s avatar`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className={`text-sm flex flex-col`}>
                      <strong>{testimonial.author}</strong>
                      {testimonial.role && (
                        <span className="text-opacity-90">
                          {testimonial.role}
                        </span>
                      )}
                    </div>
                  </div>
                  {testimonial.importedFrom && (
                    <div className="w-7 h-7 overflow-hidden rounded-full">
                      {testimonial.importedFrom === "Twitter" ? (
                        <img
                          src={twitter}
                          alt="Twitter"
                          className="w-full h-full object-cover"
                        />
                      ) : testimonial.importedFrom === "LinkedIn" ? (
                        <img
                          src={linkedIn}
                          alt="LinkedIn"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={product}
                          alt="Product Hunt"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )}
                </CardHeader>

                <CardContent className="p-2 px-4 flex flex-col gap-2 justify-center">
                  {testimonial.star && (
                    <div className="flex">
                      {Array.from({ length: testimonial.star }).map(() => (
                        <Star
                          style={{
                            fill: isValidColor(starColor)
                              ? starColor
                              : "#71D4FE",
                          }}
                          color="none"
                        />
                      ))}
                    </div>
                  )}
                  {testimonial.content && <p>"{testimonial.content}"</p>}
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt="Image"
                      className="w-full h-auto mt-2"
                    />
                  )}
                  {testimonial.video && (
                    <video
                      controls
                      src={testimonial.video}
                      className="w-full h-auto pt-6"
                    />
                  )}
                </CardContent>
                <CardFooter className="flex justify-between p-0 py-2 pb-4 px-4">
                  {testimonial.tags && testimonial.tags.length > 0 && (
                    <div className="flex gap-1">
                      {testimonial.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-[14px] flex items-center"
                          style={{
                            backgroundColor: isValidColor(tagColor)
                              ? tagColor
                              : "#C2F19D",
                            color: isValidColor(tagTextColor)
                              ? tagTextColor
                              : "black",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {testimonial.liked === true && (
                    <Heart
                      size={25}
                      color="red-500"
                      className="fill-red-500 right-0"
                    />
                  )}
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        </>
      ) : (
        <div
          className={`grid grid-rows-1 grid-flow-col gap-4 p-4 overflow-x-auto h-full ${alignmentClass} `}
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={`${testimonial.item}-${index}`}
              className={`border border-gray-200  ${
                !isValidColor(backgroundColor) && isDarkTheme
                  ? "bg-gray-800"
                  : !isValidColor(backgroundColor) && !isDarkTheme
                  ? "bg-white"
                  : ""
              } ${
                !isValidColor(textColor) && isDarkTheme
                  ? "text-white"
                  : !isValidColor(textColor) && !isDarkTheme
                  ? "text-black"
                  : ""
              } min-w-[400px] max-w-[400px] h-full`}
              style={{
                backgroundColor: isValidColor(backgroundColor)
                  ? backgroundColor
                  : undefined,
                color: isValidColor(textColor) ? textColor : undefined,
                borderRadius: cardBorderRad,
                height: cardHeight === "fit" ? "fit-content" : undefined,
              }}
            >
              <CardHeader className="flex flex-row justify-between items-start py-0 pt-4 pb-2">
                <div className="flex flex-row items-center gap-2">
                  {testimonial.avatar && (
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        src={testimonial.avatar}
                        alt={`${testimonial.author}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className={`text-sm flex flex-col`}>
                    <strong>{testimonial.author}</strong>
                    {testimonial.role && (
                      <span className="text-opacity-90">
                        {testimonial.role}
                      </span>
                    )}
                  </div>
                </div>
                {testimonial.importedFrom && (
                  <div className="w-7 h-7 overflow-hidden rounded-full">
                    {testimonial.importedFrom === "Twitter" ? (
                      <img
                        src={twitter}
                        alt="Twitter"
                        className="w-full h-full object-cover"
                      />
                    ) : testimonial.importedFrom === "LinkedIn" ? (
                      <img
                        src={linkedIn}
                        alt="LinkedIn"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={product}
                        alt="Product Hunt"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                )}
              </CardHeader>

              <CardContent className="p-2 px-4 flex flex-col gap-2 justify-center">
                {testimonial.star && (
                  <div className="flex">
                    {Array.from({ length: testimonial.star }).map(() => (
                      <Star
                        style={{
                          fill: isValidColor(starColor) ? starColor : "#71D4FE",
                        }}
                        color="none"
                      />
                    ))}
                  </div>
                )}
                {testimonial.content && <p>"{testimonial.content}"</p>}
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt="Image"
                    className="w-full h-auto mt-2"
                  />
                )}
                {testimonial.video && (
                  <video
                    controls
                    src={testimonial.video}
                    className="w-full h-auto pt-6"
                  />
                )}
              </CardContent>
              <CardFooter className="flex justify-between p-0 py-2 pb-4 px-4">
                {testimonial.tags && testimonial.tags.length > 0 && (
                  <div className="flex gap-1">
                    {testimonial.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[14px] flex items-center"
                        style={{
                          backgroundColor: isValidColor(tagColor)
                            ? tagColor
                            : "#C2F19D",
                          color: isValidColor(tagTextColor)
                            ? tagTextColor
                            : "black",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {testimonial.liked === true && (
                  <Heart
                    size={25}
                    color="red-500"
                    className="fill-red-500 right-0"
                  />
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialGridHorizontal;
