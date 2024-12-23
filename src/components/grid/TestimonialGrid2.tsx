import { useEffect, useRef, useState } from "react";
import Masonry from "masonry-layout";
import { Testimonial } from "@/interface";
import TestimonialGridCard from "./TestimonialGridCard";
import { isValidColor } from "../IsValidColor";
import { Button } from "../ui/button";
import { AnimatedTestimonialGrid } from "./animated-testimonial-grid";
import { ThemeState } from "@/interface";
import TestimonialGridCard2 from "./TestimonialGridCard2";

interface TestimonialGridProps {
  testimonials: Testimonial[];
  isLoading?: boolean;
  error?: Error | null;
  themeState?: ThemeState;
}

export const TestimonialGrid2: React.FC<TestimonialGridProps> = ({
  testimonials,
  isLoading = false,
  error = null,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>(
    []
  );
  const [displayCount, setDisplayCount] = useState(12);

  const [themeState, setThemeState] = useState({
    isDarkTheme: false,
    textColor: "",
    starColor: "",
    backgroundColor: "",
    cardBackgroundColor: "",
    tagColor: "",
    tagTextColor: "",
    cardBorderRadius: "",
    outerRadius: "",
    columns: 4,
    isAnimate: false,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const paramValues = {
      animate: urlParams.get("animated"),
      theme: urlParams.get("theme"),
      text: urlParams.get("text"),
      star: urlParams.get("star"),
      cardBackground: urlParams.get("cardBackground"),
      background: urlParams.get("background"),
      tagColor: urlParams.get("tag"),
      tagTextColor: urlParams.get("tagText"),
      cardBorderRadius: urlParams.get("cardBorderRadius"),
      divRadius: urlParams.get("outerRadius"),
      columns: urlParams.get("columns"),
    };

    setThemeState((prevState) => {
      return {
        ...prevState,
        ...(paramValues.animate === "on" && { isAnimate: true }),
        ...(paramValues.theme === "dark" && { isDarkTheme: true }),
        ...(paramValues.text && { textColor: paramValues.text }),
        ...(paramValues.star && { starColor: paramValues.star }),
        ...(paramValues.cardBackground && {
          cardBackgroundColor: paramValues.cardBackground,
        }),
        ...(paramValues.tagColor && { tagColor: paramValues.tagColor }),
        ...(paramValues.tagTextColor && {
          tagTextColor: paramValues.tagTextColor,
        }),
        ...(paramValues.cardBorderRadius && {
          cardBorderRadius: paramValues.cardBorderRadius,
        }),
        ...(paramValues.divRadius && { outerRadius: paramValues.divRadius }),
        ...(paramValues.background && {
          backgroundColor: paramValues.background,
        }),
        ...(paramValues.columns && {
          columns: parseInt(paramValues.columns) || 4,
        }),
      };
    });
  }, []);

  useEffect(() => {
    setVisibleTestimonials(testimonials.slice(0, displayCount));
  }, [testimonials, displayCount]);

  useEffect(() => {
    if (gridRef.current && visibleTestimonials.length > 0) {
      new Masonry(gridRef.current, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
        gutter: 16,
      });
    }
  }, [visibleTestimonials]);

  const loadMore = () => {
    setDisplayCount((prevCount) =>
      Math.min(prevCount + 12, testimonials.length)
    );
  };

  const cardBorderRad =
    themeState.cardBorderRadius === "low"
      ? "5px"
      : themeState.cardBorderRadius === "medium"
      ? "10px"
      : themeState.cardBorderRadius === "high"
      ? "20px"
      : "";

  const containerRadius =
    themeState.outerRadius === "low"
      ? "5px"
      : themeState.outerRadius === "medium"
      ? "10px"
      : themeState.outerRadius === "high"
      ? "20px"
      : "";

  const getColumnClass = (columns: number) => {
    switch (columns) {
      case 1:
        return "w-full";
      case 2:
        return "w-full sm:w-[calc(50%-8px)]";
      case 3:
        return "w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)]";
      default:
        return "w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]";
    }
  };

  useEffect(() => {
    if (gridRef.current && testimonials) {
      new Masonry(gridRef.current, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
        gutter: 16,
      });
    }
    console.log("radius", themeState.cardBorderRadius);
    console.log("outerRadius", cardBorderRad);
    console.log("testimonial", testimonials);
  }, [testimonials]);

  if (isLoading) {
    return (
      <div className="w-full text-center py-10">
        <div className="animate-pulse">Loading testimonials...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-10">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  if (!testimonials?.length) {
    return (
      <div className="w-full text-center py-10">
        <div className="text-gray-500">No testimonials available</div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full mx-auto p-4 flex flex-col justify-center items-center"
      style={{
        borderRadius: containerRadius,
        background: isValidColor(themeState.backgroundColor)
          ? `#${themeState.backgroundColor}`
          : "transparent",
      }}
    >
      {themeState.isAnimate ? (
        <AnimatedTestimonialGrid
          testimonials={testimonials}
          themeState={themeState}
          columns={themeState.columns}
        />
      ) : (
        <div className="w-full h-full mx-auto p-4 flex flex-col justify-center items-center">
          <div ref={gridRef} className="relative w-full">
            <div
              className={`grid-sizer ${getColumnClass(themeState.columns)}`}
            />
            {visibleTestimonials.map((testimonial, _index) => (
              <TestimonialGridCard2
                key={_index}
                index={_index}
                testimonial={testimonial}
                cardBackgroundColor={themeState.cardBackgroundColor}
                textColor={themeState.textColor}
                isDarkTheme={themeState.isDarkTheme}
                cardBorderRad={cardBorderRad}
                starColor={themeState.starColor}
                tagColor={themeState.tagColor}
                tagTextColor={themeState.tagTextColor}
                className={getColumnClass(themeState.columns)}
              />
            ))}
          </div>
          {displayCount < testimonials.length && (
            <div>
              <Button
                onClick={loadMore}
                className="mt-8 bg-white border shadow-md text-black hover:bg-gray-200"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
