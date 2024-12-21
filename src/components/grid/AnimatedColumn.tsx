import { useEffect, useRef } from "react";
import { Testimonial } from "@/interface";
import TestimonialGridCard from "./TestimonialGridCard";
import { ThemeState } from "@/interface";

interface AnimatedColumnProps {
  testimonials: Testimonial[];
  speed: number;
  startIndex: number;
  columnIndex: number;
  isPaused: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  themeState?: ThemeState;
}

export function AnimatedColumn({
  testimonials,
  speed,
  startIndex,
  columnIndex,
  isPaused,
  onMouseEnter,
  onMouseLeave,
  themeState,
}: AnimatedColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);

  let cardBorderRad = "10px";

  if (themeState?.cardBorderRadius === "low") {
    cardBorderRad = "5px";
  } else if (themeState?.cardBorderRadius === "medium") {
    cardBorderRad = "10px";
  } else {
    cardBorderRad = "20px";
  }

  useEffect(() => {
    const column = columnRef.current;
    if (!column) return;

    const totalHeight = column.scrollHeight / 2;

    const animate = () => {
      if (!isPaused) {
        positionRef.current -= speed;
        if (Math.abs(positionRef.current) >= totalHeight) {
          positionRef.current = 0;
        }
        column.style.transform = `translateY(${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, isPaused]);

  const orderedTestimonials = [
    ...testimonials.slice(startIndex),
    ...testimonials.slice(0, startIndex),
    ...testimonials.slice(startIndex),
    ...testimonials.slice(0, startIndex),
  ];

  return (
    <div
      className="h-[90vh] overflow-hidden"
      aria-live="polite"
      aria-atomic="true"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div ref={columnRef}>
        {orderedTestimonials.map((testimonial, index) => (
          <TestimonialGridCard
            key={`${columnIndex}-${index}`}
            index={index}
            testimonial={testimonial}
            cardBackgroundColor={themeState?.cardBackgroundColor}
            textColor={themeState?.textColor}
            isDarkTheme={themeState?.isDarkTheme}
            cardBorderRad={cardBorderRad}
            starColor={themeState?.starColor}
            tagColor={themeState?.tagColor}
            tagTextColor={themeState?.tagTextColor}
          />
        ))}
      </div>
    </div>
  );
}
