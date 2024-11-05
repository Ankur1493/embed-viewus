import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Star, Heart } from "lucide-react";
import { isValidColor } from "./IsValidColor";
import twitter from "@/assets/images/twitter_logo.png";
import linkedIn from "@/assets/images/twitter_logo.png";
import product from "@/assets/images/twitter_logo.png";

const TestimonialCard = ({
  testimonial,
  backgroundColor,
  textColor,
  isDarkTheme,
  cardBorderRad,
  starColor,
  tagColor,
  tagTextColor,
}) => {
  return (
    <Card
      key={`${testimonial.item}`}
      className={`border border-gray-200 ${
        !isValidColor(backgroundColor) && isDarkTheme
          ? "bg-gray-800"
          : !isValidColor(backgroundColor) && !isDarkTheme
          ? "bg-white"
          : ""
      } ${
        !isValidColor(textColor) && isDarkTheme
          ? "text-white"
          : !isValidColor(textColor) && !isDarkTheme
          ? "text-black"
          : ""
      } ${
        testimonial.image || testimonial.video
          ? "md:row-span-2"
          : "md:row-span-1"
      }`}
      style={{
        backgroundColor: isValidColor(backgroundColor)
          ? backgroundColor
          : undefined,
        color: isValidColor(textColor) ? textColor : undefined,
        borderRadius: cardBorderRad,
      }}
    >
      <CardHeader className="flex flex-row justify-between items-start py-0 pt-4 pb-2">
        <div className="flex flex-row items-center gap-2">
          {testimonial.avatar && (
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <img
                src={testimonial.avatar}
                alt={`${testimonial.author}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className={`text-sm flex flex-col`}>
            <strong>{testimonial.author}</strong>
            {testimonial.role && (
              <span className="text-opacity-90">{testimonial.role}</span>
            )}
          </div>
        </div>
        {testimonial.importedFrom && (
          <div className="w-7 h-7 overflow-hidden rounded-full">
            {testimonial.importedFrom === "Twitter" ? (
              <img
                src={twitter}
                alt="Twitter"
                className="w-full h-full object-cover"
              />
            ) : testimonial.importedFrom === "LinkedIn" ? (
              <img
                src={linkedIn}
                alt="LinkedIn"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={product}
                alt="Product Hunt"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="p-2 px-4 flex flex-col gap-2 justify-center">
        {testimonial.star && (
          <div className="flex">
            {Array.from({ length: testimonial.star }).map(() => (
              <Star
                style={{
                  fill: isValidColor(starColor) ? starColor : "#71D4FE",
                }}
                color="none"
              />
            ))}
          </div>
        )}
        {testimonial.content && <p>"{testimonial.content}"</p>}
        {testimonial.image && (
          <img
            src={testimonial.image}
            alt="Image"
            className="w-full h-auto mt-2"
          />
        )}
        {testimonial.video && (
          <video
            controls
            src={testimonial.video}
            className="w-full h-auto pt-6"
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-0 py-2 pb-4 px-4">
        {testimonial.tags && testimonial.tags.length > 0 && (
          <div className="flex gap-1">
            {testimonial.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[14px] flex items-center"
                style={{
                  backgroundColor: isValidColor(tagColor)
                    ? tagColor
                    : "#C2F19D",
                  color: isValidColor(tagTextColor) ? tagTextColor : "black",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {testimonial.liked === true && (
          <Heart size={25} color="red-500" className="fill-red-500 right-0" />
        )}
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
