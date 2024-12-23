import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { Testimonial } from "@/interface";
import { isValidColor } from "../IsValidColor";
import { cn } from "@/lib/utils";
import twitter from "@/assets/images/twitter_logo.png";
import linkedIn from "@/assets/images/linkedIn_logo.png";
import product from "@/assets/images/ProductHunt_logo.png";
import { VideoPlayer } from "../VideoPlayer";

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
  if (testimonial.reviewType === 1) {
    return (
      <Card
        key={`${testimonial._id}-${index}`}
        className={cn(
          "relative overflow-hidden aspect-video bg-gradient-to-r from-orange-400 to-amber-500 border-0",
          className
        )}
      >
        <CardContent className="p-0 h-full">
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative h-full w-full">
            {testimonial.reviewType === 1 ? (
              <video
                className="w-full h-full object-cover"
                poster={testimonial.image}
              >
                <source src={testimonial.review} type="video/mp4" />
              </video>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800" />
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="font-medium text-white mb-1">
              {testimonial.firstName} {testimonial.lastname}
            </h3>
            <div className="flex gap-1">
              {Array.from({ length: testimonial.stars || 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card
      key={`${testimonial._id}-${index}`}
      className={cn(
        "border relative shadow hover:ring ring-gray-200 ring-opacity-50 transition-all grid-item mb-4",
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
      {" "}
      <CardHeader className="flex flex-row justify-between items-start py-0 pt-4 pb-2">
        <div className="flex flex-row items-center gap-2">
          <div className="w-6 h-6 md:w-10 md:h-10 overflow-hidden rounded-full flex items-center justify-center bg-[#71D4FE]">
            {testimonial.image ? (
              <img
                src={testimonial.image}
                alt={testimonial.firstName.charAt(0)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                {testimonial.firstName.charAt(0)}
              </div>
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
                color="none inline-block w-5 h-5"
              />
            ))}
          </div>
        )}
        {testimonial.reviewType === 1 && (
          <VideoPlayer videoLink={testimonial.review!} />
        )}
        {testimonial.reviewType !== 1 && testimonial.review && (
          <p className="italic">"{testimonial.review}"</p>
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

export default TestimonialGridCard2;
