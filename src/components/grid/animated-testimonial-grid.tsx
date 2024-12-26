import { useState, useCallback } from "react";
import { AnimatedColumn } from "./AnimatedColumn";
import { Testimonial, ThemeState } from "@/interface";

interface TestimonialGridProps {
  testimonials: Testimonial[];
  themeState?: ThemeState;
  columns?: number;
}

export const AnimatedTestimonialGrid: React.FC<TestimonialGridProps> = ({
  testimonials,
  themeState,
  columns = 4,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  const gridColumns = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  };

  const getResponsiveColumns = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return Math.min(columns, 4);
  };

  const columnCount = getResponsiveColumns();

  return (
    <div
      className={`mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 ${
        gridColumns[Math.min(columns, 4) as keyof typeof gridColumns] ||
        gridColumns[4]
      }`}
    >
      {[...Array(columnCount)].map((_, index) => (
        <AnimatedColumn
          key={index}
          testimonials={testimonials}
          speed={0.5 + index * 0.1}
          startIndex={index * 3}
          columnIndex={index}
          isPaused={isPaused}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          themeState={themeState}
        />
      ))}
    </div>
  );
};
