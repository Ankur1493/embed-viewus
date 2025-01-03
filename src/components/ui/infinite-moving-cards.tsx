import React, { useEffect, useState } from "react";
import TestimonialCard from "../carousal/TestimonialCard";
import { Testimonial } from "@/interface";
import "../TestimonialCarousal.css";
import TestimonialCardLong from "../carousal/TestimonialCardLong";

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
  imageBackground,
  quoteColor,
  tagTextColor,
  cardHeight,
  cardBorderColor,
  card,
  startIndex,
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
  imageBackground?: string;
  quoteColor?: string;
  tagTextColor?: string;
  cardHeight?: string;
  cardBorderColor?: string;
  card?: string;
  startIndex?: number;
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
        containerRef.current.style.setProperty("--animation-duration", "80s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "100s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "140s");
      }
    }
  };

  const reorderItems = (items: Testimonial[], startIndex?: number) => {
    const reorderedItems = [
      ...items.slice(startIndex),
      ...items.slice(0, startIndex),
    ];
    return reorderedItems;
  };

  const reorderedItems = reorderItems(items, startIndex);

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 w-full h-auto overflow-x-hidden rounded-xl ${className}`}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full h-fit shrink-0 gap-4 w-max flex-nowrap ${
          start && "animate-scroll"
        } ${pauseOnHover && "hover:[animation-play-state:paused]"}`}
      >
        {reorderedItems.map((testimonial, idx) => (
          <li
            key={idx}
            // className="max-w-sm md:max-w-xl lg:max-w-2xl lg:min-w-2xl px-auto"
            className="w-md md:w-full"
          >
            {card === "longCard" ? (
              <TestimonialCardLong
                index={idx}
                testimonial={testimonial}
                cardBackgroundColor={cardBackgroundColor}
                textColor={textColor}
                isDarkTheme={isDarkTheme}
                cardBorderRad={cardBorderRad}
                starColor={starColor}
                tagColor={tagColor}
                imageBackground={imageBackground}
                quoteColor={quoteColor}
                tagTextColor={tagTextColor}
                cardBorderColor={cardBorderColor}
                cardHeight={cardHeight}
              />
            ) : (
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
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
