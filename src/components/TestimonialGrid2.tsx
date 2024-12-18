import { useEffect, useRef, useState } from "react";
import Masonry from "masonry-layout";
import { Testimonial } from "@/interface";
import { useGridItems } from "@/lib/api";
import TestimonialGridCard from "./TestimonialGridCard";
import { isValidColor } from "./IsValidColor";

interface TestimonialGridProps {
  testimonials: Testimonial[];
}

export const TestimonialGrid2: React.FC<TestimonialGridProps> = ({
  testimonials,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useGridItems();

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
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const paramValues = {
      theme: urlParams.get("theme"),
      text: urlParams.get("text"),
      star: urlParams.get("star"),
      cardBackground: urlParams.get("cardBackground"),
      background: urlParams.get("background"),
      tagColor: urlParams.get("tag"),
      tagTextColor: urlParams.get("tagText"),
      cardBorderRadius: urlParams.get("cardRadius"),
      divRadius: urlParams.get("radius"),
    };

    setThemeState((prevState) => {
      return {
        ...prevState,
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
      };
    });
  }, []);

  const cardBorderRad =
    {
      low: "5px",
      medium: "10px",
      high: "20px",
    }[themeState.cardBorderRadius] || "";

  const containerRadius =
    {
      low: "5px",
      medium: "10px",
      high: "20px",
    }[themeState.outerRadius] || "";

  // const getResponsiveColumns = () => {
  //   if (themeState.windowWidth < 640) return 1;
  //   if (themeState.windowWidth <= 855) return 2;
  //   if (themeState.windowWidth <= 1024) return Math.min(themeState.columns, 3);
  //   return themeState.columns;
  // };

  useEffect(() => {
    if (gridRef.current && data) {
      new Masonry(gridRef.current, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
        gutter: 16,
      });
    }
  }, [data]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.message}
      </div>
    );
  if (!data) return null;

  return (
    <div
      className="w-full h-full mx-auto p-4 flex justify-center items-center"
      style={{
        borderRadius: containerRadius,
        background: isValidColor(themeState.backgroundColor)
          ? `#${themeState.backgroundColor}`
          : "transparent",
      }}
    >
      <div ref={gridRef} className="relative w-full">
        <div className="grid-sizer w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]" />
        {testimonials.map((testimonial, _index) => (
          <TestimonialGridCard
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
          />
        ))}
      </div>
    </div>
  );
};
