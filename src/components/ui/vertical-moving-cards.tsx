import React, { useEffect, useState, useRef } from "react";
import TestimonialCard from "../TestimonialCard";
import { Testimonial } from "@/interface";
import "../TestimonialGrid.css";

export default function InfiniteMovingCards({
  items,
  direction = "up",
  speed = "normal",
  pauseOnHover = true,
  className,
  backgroundColor,
  textColor,
  isDarkTheme,
  cardBorderRad,
  starColor,
  tagColor,
  tagTextColor,
  cardHeight,
  shadowColor,
}: {
  items: Testimonial[];
  direction?: "up" | "down";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  isDarkTheme?: boolean;
  cardBorderRad?: string;
  starColor?: string;
  tagColor?: string;
  tagTextColor?: string;
  cardHeight?: string;
  shadowColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [direction, speed]);

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "up" ? "reverse" : "normal"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const speedMap = {
        fast: "20s",
        normal: "30s",
        slow: "40s",
      };
      containerRef.current.style.setProperty(
        "--animation-duration",
        speedMap[speed]
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`scroller w-screen relative z-20 ${className}`}
      style={{
        maskImage: `linear-gradient(to bottom, transparent, ${shadowColor} 10%, ${shadowColor} 90%, transparent)`,
      }}
    >
      <ul
        ref={scrollerRef}
        className={`flex flex-col gap-4 py-4 h-max w-fit ${
          start ? "infinite-scroll" : ""
        } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
      >
        {items.map((testimonial, idx) => (
          <li key={idx} className="w-fit h-full">
            <TestimonialCard
              index={idx}
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
          </li>
        ))}
      </ul>
    </div>
  );
}
