import React, { useEffect, useState } from "react";
import TestimonialCard from "../TestimonialCard";
import { Testimonial } from "@/interface";
import "../TestimonialCarousal.css";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
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
  cardHeight,
  shadowColor,
}: {
  items: Testimonial[];
  direction?: "left" | "right";
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
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "140s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "150s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "200s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 w-full h-auto overflow-x-hidden  ${className}`}
      style={{
        maskImage: `linear-gradient(to right, transparent, #${shadowColor} 5%, #${shadowColor} 95%, transparent)`,
      }}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full h-fit shrink-0 gap-4 py-4 w-max flex-nowrap ${
          start && "animate-scroll"
        } ${pauseOnHover && "hover:[animation-play-state:paused]"}`}
      >
        {items.map((testimonial, idx) => (
          <li key={idx} className="flex-shrink-0">
            <TestimonialCard
              index={idx}
              testimonial={testimonial}
              cardBackgroundColor={cardBackgroundColor}
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
};
