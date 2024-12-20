import { useEffect, useRef, useState } from "react";
import Masonry from "masonry-layout";
import { Testimonial } from "@/interface";
import TestimonialGridCard from "./TestimonialGridCard";
import { isValidColor } from "../IsValidColor";

interface TestimonialGridProps {
  testimonials: Testimonial[];
  isLoading?: boolean;
  error?: Error | null;
}

export const TestimonialGrid2: React.FC<TestimonialGridProps> = ({
  testimonials,
  isLoading = false,
  error = null,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

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
      columns: urlParams.get("columns"),
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
        ...(paramValues.columns && {
          columns: parseInt(paramValues.columns) || 4,
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

  // const getResponsiveColumns = () => {
  //   if (themeState.windowWidth < 640) return 1;
  //   if (themeState.windowWidth <= 855) return 2;
  //   if (themeState.windowWidth <= 1024) return Math.min(themeState.columns, 3);
  //   return themeState.columns;
  // };

  useEffect(() => {
    if (gridRef.current && testimonials) {
      new Masonry(gridRef.current, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
        gutter: 16,
      });
    }
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
      className="w-full h-full mx-auto p-4 flex justify-center items-center"
      style={{
        borderRadius: containerRadius,
        background: isValidColor(themeState.backgroundColor)
          ? `#${themeState.backgroundColor}`
          : "transparent",
      }}
    >
      <div ref={gridRef} className="relative w-full">
        <div className={`grid-sizer ${getColumnClass(themeState.columns)}`} />
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
            className={getColumnClass(themeState.columns)}
          />
        ))}
      </div>
    </div>
  );
};
