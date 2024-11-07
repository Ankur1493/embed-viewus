import { useEffect, useState, useRef } from "react";
import TestimonialCard from "../TestimonialCard";
import { Testimonial } from "@/interface";
import "../TestimonialGrid.css";

export default function VerticalMovingCard({
  index,
  testimonial,
  direction = "up",
  speed = "normal",
  pauseOnHover = true,
  className,
  cardBackgroundColor,
  textColor,
  isDarkTheme,
  cardBorderRad,
  starColor,
  tagColor,
  tagTextColor,
  shadowColor,
}: {
  index: number;
  testimonial: Testimonial;
  direction?: "up" | "down";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  cardBackgroundColor?: string;
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
    console.log("Rendering testimonial:", testimonial);

    if (containerRef.current && scrollerRef.current) {
      // Duplicate items for infinite scrolling effect
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      // Set direction and speed
      setDirection();
      setSpeed();
      setStart(true);
    }
  }, [direction, speed]);

  // Set the scrolling direction based on the direction prop
  const setDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "up" ? "reverse" : "normal"
      );
    }
  };

  // Set the speed based on the speed prop
  const setSpeed = () => {
    const speedMap = {
      fast: "20s",
      normal: "30s",
      slow: "40s",
    };
    if (containerRef.current) {
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
        <li key={index} className="w-fit h-full">
          <TestimonialCard
            index={index}
            testimonial={testimonial}
            cardBackgroundColor={cardBackgroundColor}
            textColor={textColor}
            isDarkTheme={isDarkTheme}
            cardBorderRad={cardBorderRad}
            starColor={starColor}
            tagColor={tagColor}
            tagTextColor={tagTextColor}
          />
        </li>
      </ul>
    </div>
  );
}
