import React, { useEffect, useState, useRef } from "react";
import { testimonials } from "../data/testimonialData";
import twitter from "../assets/images/twitter_logo.png";
import linkedIn from "../assets/images/linkedIn_logo.png";
import product from "../assets/images/ProductHunt_logo.png";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Star } from "lucide-react";
import { isValidColor } from "./IsValidColor";
import { motion, useAnimation } from "framer-motion";

const TestimonialGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [textColor, setTextColor] = useState("");
  const [starColor, setStarColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [cardBackgroundColor, setCardBackgroundColor] = useState("");
  const [tagColor, setTagColor] = useState("");
  const [tagTextColor, setTagTextColor] = useState("");
  const [borderRadius, setBorderRadius] = useState("");
  const [radius, setRadius] = useState("");
  const [shadowColor, setShadowColor] = useState("");
  const controls = useAnimation();
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    if (shouldAnimate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [shouldAnimate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get("theme");
    const animated = urlParams.get("animated");
    const speed = urlParams.get("speed");
    const text = urlParams.get("text");
    const star = urlParams.get("star");
    const cardBackground = urlParams.get("cardBackground");
    const background = urlParams.get("background");
    const tagColor = urlParams.get("tag");
    const tagTextColor = urlParams.get("tagText");
    const cardBorderRadius = urlParams.get("cardBorderRadius");
    const divRadius = urlParams.get("radius");
    const shadowColor = urlParams.get("shadow");
    const columnParam = urlParams.get("columns");

    if (columnParam) {
      const columnCount = parseInt(columnParam);
      if (columnCount === 2 || columnCount === 3 || columnCount === 4) {
        setColumns(columnCount);
      }
    }

    if (theme === "dark") setIsDarkTheme(true);
    if (animated === "on") setShouldAnimate(true);
    if (text) setTextColor(text);
    if (star) setStarColor(star);
    if (cardBackground) setCardBackgroundColor(cardBackground);
    if (tagColor) setTagColor(tagColor);
    if (tagTextColor) setTagTextColor(tagTextColor);
    if (shadowColor) setShadowColor(shadowColor);
    if (cardBorderRadius) setBorderRadius(cardBorderRadius);
    if (divRadius) setRadius(divRadius);
    if (background) setBackgroundColor(background);
    let duration = 50;
    if (speed === "medium") {
      duration = 35;
    } else if (speed === "high") {
      duration = 25;
    }
    if (shouldAnimate) {
      // const animateTestimonials = async () => {

      //   await controls.start({
      //     y: ["0%", "-100%"],
      //     transition: {
      //       duration: duration,
      //       ease: "linear",
      //       repeat: Infinity,
      //     },
      //   });
      // };
      // animateTestimonials();
      const animateScroll = async () => {
        if (containerRef.current) {
          const containerHeight = containerRef.current.offsetHeight;
          await controls.start({
            y: -containerHeight / 2,
            transition: { duration, ease: "linear", repeat: Infinity },
          });
          controls.set({ y: 0 });
          animateScroll();
        }
      };

      animateScroll();
    }
  }, [controls, shouldAnimate]);

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

  return (
    <div
      className={`relative overflow-hidden ${shouldAnimate ? "h-[100vh]" : ""}`}
      style={{
        borderRadius: containerRadius,
        background: isValidColor(backgroundColor)
          ? `#${backgroundColor}`
          : "transparent",
      }}
    >
      {shouldAnimate && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-16 opacity-70 z-20 "
            style={{
              background: isValidColor(shadowColor)
                ? `linear-gradient(#${shadowColor}, transparent)`
                : "",
            }}
          ></div>
          <div
            className="absolute bottom-0 left-0 right-0 h-16 opacity-70 z-20 "
            style={{
              background: isValidColor(shadowColor)
                ? `linear-gradient(transparent, #${shadowColor})`
                : "",
            }}
          ></div>
        </>
      )}
      <motion.div
        animate={controls}
        ref={containerRef}
        // transition={{ duration: duration, ease: "linear" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
        style={{
          width: "100%",
          borderRadius: containerRadius,
          background: isValidColor(backgroundColor)
            ? `#${backgroundColor}`
            : "transparent",
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "16px",
        }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <Card
            key={`${testimonial.item}-${index}`}
            className={`border border-gray-200 ${
              !isValidColor(cardBackgroundColor) && isDarkTheme
                ? "bg-gray-800"
                : !isValidColor(cardBackgroundColor) && !isDarkTheme
                ? "bg-white"
                : ""
            } ${
              !isValidColor(textColor) && isDarkTheme
                ? "text-white"
                : !isValidColor(textColor) && !isDarkTheme
                ? "text-black"
                : ""
            } ${
              testimonial.image || testimonial.video
                ? "md:row-span-2"
                : "md:row-span-1"
            }`}
            style={{
              backgroundColor: isValidColor(cardBackgroundColor)
                ? `#${cardBackgroundColor}`
                : undefined,
              color: isValidColor(textColor) ? `#${textColor}` : undefined,
              borderRadius: cardBorderRad,
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
                    <span className="text-opacity-90">{testimonial.role}</span>
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
                          ? `#${starColor}`
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
                          ? `#${tagColor}`
                          : "#C2F19D",
                        color: isValidColor(tagTextColor)
                          ? `#${tagTextColor}`
                          : "black",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialGrid;
