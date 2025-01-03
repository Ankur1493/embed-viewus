import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { isValidColor } from "../IsValidColor";
import twitter from "@/assets/images/twitter_logo.png";
import linkedIn from "@/assets/images/linkedIn_logo.png";
import product from "@/assets/images/ProductHunt_logo.png";
import { Testimonial } from "@/interface";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "../VideoPlayer";

interface TestimonialCardProps {
  index: number;
  testimonial: Testimonial;
  cardBackgroundColor?: string;
  textColor?: string;
  isDarkTheme?: boolean;
  cardBorderRad?: string;
  starColor?: string;
  tagColor?: string;
  tagTextColor?: string;
  cardBorderColor?: string;
  cardHeight?: string;
  cardWidth?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  index,
  testimonial,
  cardBackgroundColor = "",
  textColor = "",
  isDarkTheme = false,
  cardBorderRad = "",
  starColor = "#71D4FE",
  tagColor = "#C2F19D",
  cardBorderColor = "",
  tagTextColor = "black",
  cardHeight,
}) => {
  return (
    <Card
      key={`${testimonial._id}-${index}`}
      className={cn(
        "border w-full my-2 shadow hover:ring ring-gray-200 ring-opacity-50 transition-all md:w-80 w-72 h-full",
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
        height: cardHeight === "full" ? "full" : "fit-content",
        borderRadius: cardBorderRad,
        borderColor: isValidColor(cardBorderColor)
          ? `#${cardBorderColor}`
          : "transparent",
        // minWidth: cardWidth ? `${cardWidth}px` : undefined,
      }}
    >
      <CardHeader className="flex flex-row justify-between items-start py-0 pt-4 pb-2">
        <div className="flex flex-row items-center gap-2">
          <div className="w-6 h-6 md:w-10 md:h-10 overflow-hidden rounded-full flex items-center justify-center bg-[#71D4FE]">
            {testimonial.image ? (
              <img
                src={
                  testimonial.image.startsWith("http")
                    ? testimonial.image
                    : `https://d3eyp937ijscg0.cloudfront.net/${testimonial.image}`
                }
                alt={testimonial.firstName.charAt(0)}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{testimonial.firstName.charAt(0)}</span>
            )}
          </div>
          <div className={`text-sm flex flex-col`}>
            <strong>{testimonial.firstName}</strong>
            {testimonial.jobTitle && testimonial.company ? (
              <span className="text-xs text-opacity-90">
                {testimonial.jobTitle} at {testimonial.company}
              </span>
            ) : testimonial.jobTitle ? (
              <span className="text-xs text-opacity-90">
                {testimonial.jobTitle}
              </span>
            ) : (
              testimonial.company && (
                <span className="text-xs text-opacity-90">
                  {testimonial.company}
                </span>
              )
            )}
          </div>
        </div>
        {testimonial.reviewType === 2 && (
          <div className="w-7 h-7 overflow-hidden rounded-full">
            <img
              src={
                testimonial.importedReviewType === 0
                  ? twitter
                  : testimonial.importedReviewType === 1
                  ? linkedIn
                  : product
              }
              alt="imported"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-2 px-4 flex flex-col gap-2 justify-center">
        {testimonial.stars && (
          <div className="flex">
            {Array.from({ length: testimonial.stars }).map((_, i) => (
              <Star
                key={i}
                style={{
                  fill: isValidColor(starColor) ? `#${starColor}` : "#71D4FE",
                }}
                color="none"
              />
            ))}
          </div>
        )}
        {testimonial.reviewType === 1 && (
          <VideoPlayer videoLink={testimonial.review!} />
        )}
        {testimonial.reviewType !== 1 && testimonial.review && (
          <p>"{testimonial.review}"</p>
        )}
        {testimonial.reviewType === 2 &&
          (testimonial.importedVideo &&
          testimonial.importedVideo[0] !== "" &&
          testimonial.importedVideo.length > 0 ? (
            <div className="w-full h-64 max-h-64 rounded-md mt-2 overflow-hidden flex items-start">
              <video
                controls
                src={testimonial.importedVideo}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ) : testimonial.importedImage &&
            testimonial.importedImage.length > 0 ? (
            <div className="w-full h-56 max-h-64 rounded-md mt-2 overflow-hidden">
              <img
                src={testimonial.importedImage}
                alt="Image"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ) : null)}
      </CardContent>
      <CardFooter className="flex justify-between p-0 py-2 pb-4 px-4">
        {testimonial.tags && testimonial.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {testimonial.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2 py-1 text-xs font-medium"
                style={{
                  backgroundColor: isValidColor(tagColor)
                    ? `#${tagColor}`
                    : "#C2F19D",
                  color: isValidColor(tagTextColor)
                    ? `#${tagTextColor}`
                    : "black",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
