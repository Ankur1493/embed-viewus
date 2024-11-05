"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, Star } from "lucide-react";

// Mock data for testimonials
const testimonials = [
  {
    author: "John Doe",
    role: "CEO",
    content: "This product has revolutionized our workflow!",
    star: 5,
    tags: ["Efficient", "User-friendly"],
    liked: true,
  },
  {
    author: "Jane Smith",
    role: "Designer",
    content: "The interface is intuitive and a joy to use.",
    star: 4,
    tags: ["Design", "UX"],
    liked: false,
  },
  {
    author: "Mike Johnson",
    role: "Developer",
    content: "The API is well-documented and easy to integrate.",
    star: 5,
    tags: ["API", "Documentation"],
    liked: true,
  },
];

export default function TestimonialCarousel({
  initialAnimated = false,
}: {
  initialAnimated?: boolean;
}) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(initialAnimated);
  const [textColor, setTextColor] = useState("");
  const [starColor, setStarColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [tagColor, setTagColor] = useState("");
  const [tagTextColor, setTagTextColor] = useState("");
  const [borderRadius, setBorderRadius] = useState("");
  const [radius, setRadius] = useState("");

  const isValidColor = (color: string) => {
    const s = new Option().style;
    s.color = color;
    return s.color !== "";
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get("theme");
    const animated = urlParams.get("animated");
    const text = urlParams.get("text");
    const star = urlParams.get("star");
    const background = urlParams.get("background");
    const tag = urlParams.get("tag");
    const tagText = urlParams.get("tagText");
    const cardBorderRadius = urlParams.get("cardBorderRadius");
    const divRadius = urlParams.get("radius");

    if (theme === "dark") setIsDarkTheme(true);
    if (animated === "on") setShouldAnimate(true);
    if (text) setTextColor(text);
    if (star) setStarColor(star);
    if (background) setBackgroundColor(background);
    if (tag) setTagColor(tag);
    if (tagText) setTagTextColor(tagText);
    if (cardBorderRadius) setBorderRadius(cardBorderRadius);
    if (divRadius) setRadius(divRadius);
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

  const carouselVariants = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  const TestimonialCard = ({
    testimonial,
  }: {
    testimonial: (typeof testimonials)[0];
  }) => (
    <Card
      className={`border border-gray-200 ${
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
      } w-[300px] shrink-0`}
      style={{
        backgroundColor: isValidColor(backgroundColor)
          ? backgroundColor
          : undefined,
        color: isValidColor(textColor) ? textColor : undefined,
        borderRadius: cardBorderRad,
      }}
    >
      <CardHeader className="flex flex-row justify-between items-start py-4">
        <div className="flex flex-col">
          <strong>{testimonial.author}</strong>
          {testimonial.role && (
            <span className="text-sm opacity-70">{testimonial.role}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="py-2">
        {testimonial.star && (
          <div className="flex mb-2">
            {Array.from({ length: testimonial.star }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4"
                style={{
                  fill: isValidColor(starColor) ? starColor : "#FFD700",
                  stroke: "none",
                }}
              />
            ))}
          </div>
        )}
        <p className="text-sm">"{testimonial.content}"</p>
      </CardContent>
      <CardFooter className="flex justify-between py-4">
        {testimonial.tags && testimonial.tags.length > 0 && (
          <div className="flex gap-1">
            {testimonial.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: isValidColor(tagColor)
                    ? tagColor
                    : "#E5E7EB",
                  color: isValidColor(tagTextColor) ? tagTextColor : "black",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {testimonial.liked && (
          <Heart className="w-5 h-5 text-red-500 fill-current" />
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div
      className="w-full overflow-hidden"
      style={{ borderRadius: containerRadius }}
    >
      {shouldAnimate ? (
        <motion.div
          className="flex gap-4 p-4"
          variants={carouselVariants}
          animate="animate"
          style={{ width: `${testimonials.length * 320 * 2}px` }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.author}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </motion.div>
      ) : (
        <div className="flex gap-4 p-4 overflow-x-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.author}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      )}
    </div>
  );
}
