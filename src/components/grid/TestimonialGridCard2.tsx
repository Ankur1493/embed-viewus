import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/interface";
import { isValidColor } from "../IsValidColor";
import { cn } from "@/lib/utils";

interface TestimonialGridCard2Props {
  index: number;
  testimonial: Testimonial;
  cardBackgroundColor?: string;
  textColor?: string;
  isDarkTheme?: boolean;
  cardBorderRad?: string;
  starColor?: string;
  tagColor?: string;
  tagTextColor?: string;
  className?: string;
}

const TestimonialGridCard2: React.FC<TestimonialGridCard2Props> = ({
  index,
  testimonial,
  cardBackgroundColor = "",
  textColor = "",
  isDarkTheme = false,
  cardBorderRad = "",
  starColor = "71D4FE",
  tagColor = "C2F19D",
  tagTextColor = "black",
  className = "",
}) => {
  return (
    <Card
      key={`${testimonial._id}-${index}`}
      className={cn(
        "border  shadow hover:ring ring-gray-200 ring-opacity-50 transition-all grid-item mb-4",
        className,
        isDarkTheme ? "border-gray-800" : "border-gray-200",
        !isValidColor(cardBackgroundColor) && isDarkTheme
          ? "bg-gray-800"
          : !isValidColor(cardBackgroundColor) && !isDarkTheme
          ? "bg-white"
          : "",
        !isValidColor(textColor) && isDarkTheme
          ? "text-white"
          : !isValidColor(textColor) && !isDarkTheme
          ? "text-black"
          : ""
      )}
      style={{
        backgroundColor: isValidColor(cardBackgroundColor)
          ? `#${cardBackgroundColor}`
          : undefined,
        color: isValidColor(textColor) ? `#${textColor}` : undefined,
        borderRadius: cardBorderRad,
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            {testimonial.image ? (
              <img
                src={testimonial.image}
                alt={testimonial.firstName.charAt(0)}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                {testimonial.firstName.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">
              {testimonial.firstName} {testimonial.lastname}
            </h3>
            {(testimonial.jobTitle || testimonial.company) && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {testimonial.jobTitle}{" "}
                {testimonial.company && `at ${testimonial.company}`}
              </p>
            )}
          </div>
        </div>
        {testimonial.stars && (
          <div className="mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`inline-block w-5 h-5 ${"text-yellow-400 fill-current"}`}
              />
            ))}
          </div>
        )}
        <div className="relative mb-4">
          <Quote className="absolute top-0 left-0 w-8 h-8 text-gray-300 transform -translate-x-2 -translate-y-2" />
          <p className="text-gray-700 dark:text-gray-300 italic pl-6">
            {testimonial.review}
          </p>
        </div>
        {testimonial.tags && (
          <div className="flex flex-wrap gap-2">
            {testimonial.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestimonialGridCard2;
